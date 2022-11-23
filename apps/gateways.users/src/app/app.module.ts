import { Module } from '@nestjs/common';

import { GlobalModule } from './@common/modules/global.module';

import { AppService } from './app.service';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GlobalModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
