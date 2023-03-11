import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';

import { AuthResolver } from './auth.resolver';
import { LocalSerializer } from './serializers/local.serializer';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';

@Module({
  imports: [UsersModule],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    LocalSerializer,
    GoogleAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
