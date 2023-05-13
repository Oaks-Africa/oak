import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './@common/modules/global.module';
import { UsersModule } from './users/users.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [GlobalModule, UsersModule, OtpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
