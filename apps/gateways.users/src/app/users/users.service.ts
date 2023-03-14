import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { USERS_SERVICE_NAME, UsersServiceClient } from "@oak/services.users/proto";

import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger: Logger;

  private usersClient: UsersServiceClient;

  constructor(
    @Inject(USERS_SERVICE_NAME)
    private readonly client: ClientGrpc
  ) {
    this.logger = new Logger(UsersService.name);
  }

  onModuleInit() {
    this.usersClient =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async findById(id: string): Promise<UserDto> {
    return {
      id: 'kdkd',
      email: 'dkdjfd',
      viaGoogle: true,
    };
  }
}
