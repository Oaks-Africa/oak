import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { UsersService } from './users.service';

import { UsersController } from './users.controller';
import { Email } from "../@common/entities/email.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Email])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
