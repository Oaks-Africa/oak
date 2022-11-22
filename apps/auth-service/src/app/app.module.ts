import { APP_FILTER } from '@nestjs/core';
import { CacheModule, Module } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { environment } from '../environments/environment';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,

      // Store-specific configuration:
      host: environment.cache.host,
      port: environment.cache.port,
      auth_pass: environment.cache.password,
      db: environment.cache.db,
    }),
    TypeOrmModule.forRoot({
      url: environment.database.url,
      autoLoadEntities: true,
      type: 'mongodb',
      useUnifiedTopology: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RpcException,
    },
  ],
})
export class AppModule {}
