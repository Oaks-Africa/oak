import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

import { ObjectID, Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { JwtPayload } from './interfaces/jwt-payload.interface';

import { RegisterDto } from './dtos/register.dto';
import { RegisteredDto } from './dtos/registered.dto';
import { ValidateJwtDto } from './dtos/validate-jwt.dto';
import { JwtValidatedDto } from './dtos/jwt-validated.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger;

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async register(registerDto: RegisterDto): Promise<RegisteredDto> {
    try {
      let user = this.userRepository.create({
        email: registerDto.email,
        password: registerDto.password,
        lastLogin: new Date(),
      });

      user = await this.userRepository.save(user);
      const accessToken = await this.generateJwtToken(user);

      return {
        user,
        auth: {
          accessToken,
        },
      };
    } catch (e) {
      this.logger.error('REGISTER', e);
      throw new RpcException('Failed to register');
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
      throw new RpcException('Failed to find user by id');
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new RpcException('Failed to find user by email');
    }
  }

  async validateJwt(validateJwtDto: ValidateJwtDto): Promise<JwtValidatedDto> {
    try {
      const { jwt } = validateJwtDto;

      const payload = this.jwtService.decode(jwt) as JwtPayload;

      const user = await this.findUserById(payload.userId);

      return {
        user,
        auth: {
          accessToken: jwt,
        },
      };
    } catch (error) {
      throw new RpcException('Failed to validate jwt');
    }
  }

  private async generateJwtToken(user: User) {
    const payload: JwtPayload = { userId: user.id, email: user.email };

    return this.jwtService.sign(payload);
  }
}
