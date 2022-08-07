import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { environment } from '../environments/environment';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestConsumer } from './test.consumer';
import { AuthModule } from './auth/auth.module';
import { MauthModule } from './mauth/mauth.module';
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   // autoSchemaFile: true,
    //   // sortSchema: true,
    // }),
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
    MauthModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
