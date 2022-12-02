import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from './entities/user.entity';

import { UsersService } from './users.service';

import { UniqueEmail } from './validators/unique-email.validator';

import { UserCreatedActivity } from './activities/user-created.activity';

import { UsersController } from './users.controller';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UniqueEmail, UserCreatedActivity],
})
export class UsersModule {}
