import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { lastValueFrom } from 'rxjs';
import { InjectTemporalClient } from 'nestjs-temporal';
import { MikroORM, UseRequestContext, wrap } from '@mikro-orm/core';
import { WorkflowClient } from '@temporalio/client';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mongodb';

import { environment } from '../../environments/environment';

import {
  FoundUserByEmailAndPassword,
  FoundUserByEmailAndProvider,
  UserCreated,
} from '../../assets/proto/users.pb';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { FindByEmailDto } from './dto/find-by-email.dto';
import { FindByEmailAndPasswordDto } from './dto/find-by-email-and-password.dto';

import { TokenGenerationService } from '../@common/services/token-generation.service';
import { FindByEmailAndProviderDto } from './dto/find-by-email-and-provider.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger;

  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly kycClient: ClientKafka,
    @InjectTemporalClient() private readonly temporalClient: WorkflowClient,
    private readonly orm: MikroORM,
    @InjectRepository(User)
    private readonly usersRepository: EntityRepository<User>,
    private readonly tokenGenerationService: TokenGenerationService
  ) {
    this.logger = new Logger(UsersService.name);
  }

  @UseRequestContext()
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create({
        ...createUserDto,
        lastSignIn: createUserDto.providerId ? new Date() : null,
        profile: {
          name: createUserDto.name,
          avatar:
            createUserDto.avatar ??
            `https://ui-avatars.com/api/?name=${createUserDto.name.first}+${createUserDto.name.last}`,
        },
      });
      await this.usersRepository.persistAndFlush(user);

      await this.initiateUserCreatedWorkflow(user);

      return {
        requestData: createUserDto,
        ...user,
        id: user.id,
        lastSignIn: user.lastSignIn?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      } as UserCreated;
    } catch (e) {
      this.logger.error('EXCEPTION CAUGHT: ', e);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException('failed to create user');
    }
  }

  @UseRequestContext()
  async findByEmail({ email }: FindByEmailDto) {
    return await this.usersRepository.findOne({ email });
  }

  @UseRequestContext()
  async findByEmailAndPassword({ email, password }: FindByEmailAndPasswordDto) {
    try {
      const user = await this.usersRepository.findOneOrFail({ email });

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new NotFoundException('user with email and password not found');
      }

      wrap(user).assign({
        lastSignIn: new Date(),
      });

      await this.usersRepository.flush();

      return {
        requestData: { email, password },
        ...user,
        id: user.id,
        lastSignIn: user.lastSignIn?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      } as FoundUserByEmailAndPassword;
    } catch (e) {
      this.logger.error('EXCEPTION CAUGHT: ', e);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException('failed to retrieve user');
    }
  }

  @UseRequestContext()
  async findByEmailAndProvider({
    email,
    provider,
    providerId,
  }: FindByEmailAndProviderDto) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        email,
        provider,
        providerId,
      });

      wrap(user).assign({
        lastSignIn: new Date(),
      });

      await this.usersRepository.flush();

      return {
        requestData: { email, provider, providerId },
        ...user,
        id: user.id,
        lastSignIn: user.lastSignIn?.toISOString(),
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      } as FoundUserByEmailAndProvider;
    } catch (e) {
      this.logger.error('EXCEPTION CAUGHT: ', e);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException('failed to retrieve user');
    }
  }

  async initiateUserCreatedWorkflow(data: User) {
    const handle = await this.temporalClient.start('UserCreated', {
      args: [data],
      taskQueue: environment.temporal.taskQueue,
      workflowId: this.tokenGenerationService.generateWorkflowId('UserCreated'),
    });

    this.logger.log('USER CREATED WORKFLOW HAS STARTED: ', handle.workflowId);
  }

  async emitUserCreatedEvent(data: User) {
    return await lastValueFrom(
      this.kycClient.emit('oaks.users.user.created', data)
    );
  }
}
