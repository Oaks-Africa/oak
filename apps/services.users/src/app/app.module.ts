import { Module } from '@nestjs/common';

import { GlobalModule } from './@common/modules/global.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';

import { AppService } from './app.service';

import { AppController } from './app.controller';

@Module({
  imports: [GlobalModule, HealthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
