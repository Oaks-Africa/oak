import { CacheModule, Global, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PassportModule } from '@nestjs/passport';

import { join } from 'path';
import * as redisStore from 'cache-manager-redis-store';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginSchemaReporting,
} from 'apollo-server-core';

import { environment } from '../../../environments/environment';

import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { GqlCookieAuthGuard } from '../guards/gql-cookie-auth.guard';
import { LoginWithCredentialsGuard } from '../guards/login-with-credentials.guard';

import { Match } from '../validators/match.validator';

import {
  USERS_PACKAGE_NAME,
  USERS_SERVICE_NAME,
} from '../../../../../services.users/src/assets/proto/users';
console.log(environment.app.allowedDomains)
const usersServiceProvider = {
  provide: USERS_SERVICE_NAME,
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: USERS_PACKAGE_NAME,
        protoPath: join(
          __dirname,
          '../../apps/services.users/assets/proto/users.proto'
        ),
        url: environment.services.users.url,
      },
    });
  },
};

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
    PassportModule,
  ],
  providers: [
    GqlAuthGuard,
    Match,
    LoginWithCredentialsGuard,
    GqlCookieAuthGuard,
    usersServiceProvider,
  ],
  exports: [
    CacheModule,
    GqlAuthGuard,
    LoginWithCredentialsGuard,
    GqlCookieAuthGuard,
    Match,
    usersServiceProvider,
    PassportModule,
  ],
})
export class GlobalModule {}
