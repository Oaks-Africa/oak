import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { USERS_SERVICE_NAME } from '../@common/constants/app.constant';

import { ResponseMessage } from '../@common/decorators/response-message.decorator';

import { CreateUserDto } from './dto/create-user.dto';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(USERS_SERVICE_NAME, 'CreateUser')
  @ResponseMessage('user created')
  async create(data: CreateUserDto) {
    return await this.usersService.create(data);
  }
}
