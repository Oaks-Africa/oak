/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { environment } from "./environments/environment";

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = environment.app.port;
  await app.listen(port);

  const domain = environment.app.domain;
  const appName = environment.app.name;
  Logger.log(`🚀 ${appName} is running on: ${domain}:${port}/${globalPrefix}`);
}

bootstrap();
