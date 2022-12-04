import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';

import { AuthResolver } from './auth.resolver';
import { LocalSerializer } from './serializers/local.serializer';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
