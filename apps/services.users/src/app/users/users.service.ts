import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { InjectTemporalClient } from 'nestjs-temporal';
import { WorkflowClient } from '@temporalio/client';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mongodb';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';

import { environment } from '../../environments/environment';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindByEmailDto } from './dto/find-by-email.dto';

import { TokenGenerationService } from '../@common/services/token-generation.service';

@Injectable()
export class UsersService {
  private readonly logger: Logger;

  constructor(
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
        profile: {
          name: createUserDto.name,
        },
      });
      await this.usersRepository.persistAndFlush(user);

      await this.initiateUserCreatedWorkflow(user);

      return { requestData: createUserDto, ...user };
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async initiateUserCreatedWorkflow(data: User) {
    const handle = await this.temporalClient.start('UserCreated', {
      args: ['howdy'],
      taskQueue: environment.temporal.taskQueue,
      workflowId: this.tokenGenerationService.generateWorkflowId('UserCreated'),
    });

    this.logger.log('USER CREATED WORKFLOW HAS STARTED: ', handle.workflowId);
  }
}
