import { BadRequestException, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { ResponseMessage } from '../@common/decorators/response-message.decorator';

import { USERS_SERVICE_NAME } from '@oak/services.users/proto';

import { CreateUserDto } from './dto/create-user.dto';
import { FindByEmailAndPasswordDto } from './dto/find-by-email-and-password.dto';
import { FindByEmailAndProviderDto } from './dto/find-by-email-and-provider.dto';
import { FindByEmailDto } from './dto/find-by-email.dto';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(USERS_SERVICE_NAME, 'CreateUser')
  @ResponseMessage('user created')
  async create(data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'FindByEmailAndPassword')
  @ResponseMessage('user retrieved successfully')
  async findByEmailAndPassword(data: FindByEmailAndPasswordDto) {
    return await this.usersService.findByEmailAndPassword(data);
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'FindByEmailAndProvider')
  @ResponseMessage('user retrieved successfully')
  async findByEmailAndProvider(data: FindByEmailAndProviderDto) {
    return await this.usersService.findByEmailAndProvider(data);
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'FindByEmail')
  @ResponseMessage('user retrieved successfully')
  async findByEmail(data: FindByEmailDto) {
    const res = await this.usersService.findByEmail(data);

    if (!res) {
      throw new BadRequestException('user with email does not exist');
    }

    return res;
  }
}
