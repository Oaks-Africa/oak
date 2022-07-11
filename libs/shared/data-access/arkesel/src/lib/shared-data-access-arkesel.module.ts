import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import arkeselConfig from './configs/arkesel.config';

import { OtpService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [arkeselConfig],
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'api-key': configService.get<string>('arkesel.apiKey'),
        },
        baseURL: configService.get<string>('arkesel.baseUrl'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class SharedDataAccessArkeselModule {}
