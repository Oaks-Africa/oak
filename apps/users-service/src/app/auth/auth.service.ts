import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';

import { ObjectID, Repository } from 'typeorm';

import { lastValueFrom } from 'rxjs';

import { User } from './entities/user.entity';

import { AuthRegisteredEvent } from './events/auth-registered.event';

import { Events } from '../common/enums/events.enum';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService as AuthServiceInterface } from './interfaces/auth-service.interface';

import { RegisterInput } from './dto/register.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { RegisteredOutput } from './dto/registered.output';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger: Logger;
  private authService: AuthServiceInterface;

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceInterface>('AuthService');
  }

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
    @Inject('AUTH_PACKAGE') private readonly authClient: ClientGrpc,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async register(registerInput: RegisterInput): Promise<RegisteredOutput> {
    try {
      let response = await lastValueFrom(
        this.authService.register(registerInput)
      );

      const user = await this.userRepository.findOneOrFail({
        where: {
          id: response.user?.id,
        },
      });

      const authRegisteredEvent = new AuthRegisteredEvent();
      authRegisteredEvent.user = user;
      this.eventEmitter.emit(Events.AUTH_REGISTERED, authRegisteredEvent);

      return {
        user,
        auth: response.auth,
      };
    } catch (e) {
      console.log('hiii', e);
      throw new UnauthorizedException('Failed to register');
    }
  }

  async findUserById(id: ObjectID) {
    try {
      return await this.userRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async generateJwtToken(user: User) {
    const payload: JwtPayload = { userId: user.id, email: user.email };

    return this.jwtService.sign(payload);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async validateJwt(jwt: string) {
    const authUser = await lastValueFrom(this.authService.validateJwt({ jwt }));

    return authUser?.user;
  }
}
