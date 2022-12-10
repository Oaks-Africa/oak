import { Injectable } from '@nestjs/common';

import { Activities, Activity } from 'nestjs-temporal';

import { User } from '../entities/user.entity';

import { UsersService } from '../users.service';

export interface IUserCreatedActivity {
  emitUserCreatedEvent(user: User): Promise<any>;
}

@Injectable()
@Activities()
export class UserCreatedActivity {
  constructor(private readonly usersService: UsersService) {}

  @Activity()
  async emitUserCreatedEvent(user: User): Promise<any> {
    return await this.usersService.emitUserCreatedEvent(user);
  }
}
