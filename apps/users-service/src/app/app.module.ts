import { CacheModule, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';

import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { environment } from '../environments/environment';

import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,

      // Store-specific configuration:
      host: environment.cache.host,
      port: environment.cache.port,
      auth_pass: environment.cache.password,
      db: environment.cache.db,
    }),
    BullModule.forRoot({
      prefix: environment.queue.prefix,
      redis: {
        host: environment.queue.host,
        port: environment.queue.port,
        password: environment.queue.password,
        db: environment.queue.db,
      },
    }),
    BullModule.registerQueue({
      name: 'test',
    }),
    TypeOrmModule.forRoot({
      url: environment.database.url,
      autoLoadEntities: true,
      type: 'mongodb',
      useUnifiedTopology: true,
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
