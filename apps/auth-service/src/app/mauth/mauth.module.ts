import { Module } from '@nestjs/common';
import { MauthService } from './mauth.service';
import { MauthController } from './mauth.controller';

@Module({
  controllers: [MauthController],
  providers: [MauthService],
})
export class MauthModule {}
