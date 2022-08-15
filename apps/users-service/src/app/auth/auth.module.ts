import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

import { environment } from '../../environments/environment';

import { User } from './entities/user.entity';

import { AuthService } from './auth.service';

import { AuthResolver } from './auth.resolver';

import { AuthRegisteredListener } from './listeners/auth-registered.listener';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [environment.bus.rabbitmq.exchanges.notifications],
      uri: environment.bus.rabbitmq.url,
      connectionInitOptions: { wait: false },
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.signOptions.expiresIn },
    }),
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, 'assets/protos/auth.proto'),
          url: environment.clients.auth.url,
        },
      },
    ]),
  ],
  providers: [AuthResolver, AuthService, AuthRegisteredListener],
  controllers: [],
})
export class AuthModule {}
