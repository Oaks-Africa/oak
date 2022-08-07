import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { ObjectID, Repository } from "typeorm";

import { User } from "./entities/user.entity";

import { AuthRegisteredEvent } from "./events/auth-registered.event";

import { Events } from "../common/enums/events.enum";

import { JwtPayload } from "./interfaces/jwt-payload.interface";

import { RegisterInput } from "./dto/register.input";
import { UpdateAuthInput } from "./dto/update-auth.input";
import { RegisteredOutput } from "./dto/registered.output";


@Injectable()
export class AuthService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async register(registerInput: RegisterInput): Promise<RegisteredOutput> {
    try {
      let user = this.userRepository.create({
        email: registerInput.email,
        password: registerInput.password
      });

      user = await this.userRepository.save(user);
      const accessToken = await this.generateJwtToken(user);

      const authRegisteredEvent = new AuthRegisteredEvent();
      authRegisteredEvent.user = user;
      this.eventEmitter.emit(Events.AUTH_REGISTERED, authRegisteredEvent);

      return {
        user,
        auth: {
          accessToken
        }
      };
    } catch (e) {
      throw new UnauthorizedException("Failed to register");
    }
  }

  async findUserById(id: ObjectID) {
    try {
      return await this.userRepository.findOneOrFail({
        where: {
          id
        }
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async generateJwtToken(user: User) {
    const payload: JwtPayload = { userId: user.id, email: user.email };

    return this.jwtService.sign(payload);
  }

  findAll() {
    return `This action returns all auth`;
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

  validateJwt(jwtToken: string) {
    return jwtToken;
  }
}
