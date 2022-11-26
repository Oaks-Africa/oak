import { Module } from '@nestjs/common';

import { GlobalModule } from './@common/modules/global.module';
import { HealthModule } from './health/health.module';

import { AppService } from './app.service';

import { AppController } from './app.controller';

@Module({
  imports: [GlobalModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
