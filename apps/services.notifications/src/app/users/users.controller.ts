import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { USER_CREATED } from '../@common/constants/kafka-events.constant';

import { UserCreatedDto } from './dto/user-created.dto';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(USER_CREATED)
  async handleUserCreated(data: UserCreatedDto) {
    await this.usersService.handleUserCreated(data);
  }
}
