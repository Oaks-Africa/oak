import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';

import { UserCreatedActivity } from './activities/user-created.activity';

import { UsersController } from './users.controller';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserCreatedActivity],
})
export class UsersModule {}
