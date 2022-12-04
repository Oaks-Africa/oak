import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { ResponseMessage } from '../@common/decorators/response-message.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { FindByEmailAndPasswordDto } from './dto/find-by-email-and-password.dto';

import { USERS_SERVICE_NAME } from '../../assets/proto/users';

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
}
