import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { useContainer } from 'class-validator';
import * as session from 'express-session';
import * as passport from 'passport';
import * as createRedisStore from 'connect-redis';
const Redis = require('ioredis');

import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        let [result] = errors;
        if (!result.constraints) {
          [result] = result.children;
        }

        const [message] = Object.values(result.constraints);

        return new BadRequestException(message);
      },
    })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const client = new Redis();
  const RedisStore = createRedisStore(session);
  app.use(
    session({
      store: new RedisStore({
        client,
        port: environment.redis.cache.port,
        host: environment.redis.cache.host,
      }),
      secret: environment.session.secret,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = environment.app.port;
  await app.listen(port);

  const domain = environment.app.domain;
  const appName = environment.app.name;
  Logger.log(`🚀 ${appName} is running on: ${domain}:${port}`);
}

bootstrap();
