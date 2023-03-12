import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';

import { AuthResolver } from './auth.resolver';
import { LocalSerializer } from './serializers/local.serializer';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LoginWithGoogleGuard } from './guards/login-with-google.guard';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';
import { LoginWithCredentialsGuard } from "./guards/login-with-credentials.guard";

@Module({
  imports: [UsersModule],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    GoogleOauthStrategy,
    LocalSerializer,
    LoginWithCredentialsGuard,
    LoginWithGoogleGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
