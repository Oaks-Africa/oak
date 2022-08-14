import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import type { ClientOpts } from "redis";
import * as redisStore from "cache-manager-redis-store";

import { environment } from "../environments/environment";

import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,

      // Store-specific configuration:
      host: environment.cache.host,
      port: environment.cache.port,
      auth_pass: environment.cache.password,
      db: environment.cache.db
    }),
    TypeOrmModule.forRoot({
      url: environment.database.url,
      autoLoadEntities: true,
      type: "mongodb",
      useUnifiedTopology: true
    }),
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
