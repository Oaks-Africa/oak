import {CacheModule, Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {environment} from "../environments/environment";

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
    })

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
