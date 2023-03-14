import { CacheModule, Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import * as redisStore from 'cache-manager-redis-store';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginSchemaReporting,
} from 'apollo-server-core';

import { environment } from '../../../environments/environment';

import { Match } from '../validators/match.validator';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: environment.redis.cache.host,
      port: environment.redis.cache.port,
      db: environment.redis.cache.db,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cache: 'bounded',
      playground: false,
      autoSchemaFile: true,
      debug: false,
      cors: {
        credentials: true,
        origin: [...environment.app.allowedDomains],
      },
      plugins: [
        ApolloServerPluginSchemaReporting(),
        ApolloServerPluginLandingPageLocalDefault(),
      ],
    }),
  ],
  providers: [Match],
  exports: [CacheModule, Match],
})
export class CoreModule {}
