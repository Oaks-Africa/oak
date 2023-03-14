import { Module } from '@nestjs/common';

import { CoreModule } from './@common/modules/core.module';
import { ServicesModule } from './@common/modules/services.module';
import { CommonAuthModule } from './@common/modules/common-auth.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { AppService } from './app.service';

import { AppController } from './app.controller';

@Module({
  imports: [
    CoreModule,
    ServicesModule,
    CommonAuthModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
