import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { environment } from '../../environments/environment';

import { User } from './entities/user.entity';

import { AuthService } from './auth.service';

import { AuthResolver } from './auth.resolver';

import { AuthController } from './auth.controller';

import { AuthRegisteredListener } from './listeners/auth-registered.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.signOptions.expiresIn },
    }),
  ],
  providers: [AuthResolver, AuthService, AuthRegisteredListener],
  controllers: [AuthController],
})
export class AuthModule {}
