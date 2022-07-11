import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedDataAccessArkeselModule } from '@oak/shared/data-access/arkesel';

import { PhoneNumberVerificationService } from './services';

import phoneNumberVerificationConfig from './configs/phone-number-verification.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [phoneNumberVerificationConfig],
    }),
    SharedDataAccessArkeselModule,
  ],
  providers: [PhoneNumberVerificationService],
  exports: [PhoneNumberVerificationService],
})
export class SharedDataAccessPhoneNumberVerificationModule {}
