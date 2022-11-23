import { CacheModule, Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginSchemaReporting,
} from 'apollo-server-core';

import { environment } from '../../../environments/environment';

import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Global()
@Module({
  imports: [
    CacheModule.register<ClientOpts>({
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
      plugins: [
        ApolloServerPluginSchemaReporting(),
        ApolloServerPluginLandingPageLocalDefault(),
      ],
    }),
  ],
  providers: [GqlAuthGuard],
  exports: [CacheModule, GqlAuthGuard],
})
export class GlobalModule {}
