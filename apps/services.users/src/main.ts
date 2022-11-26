import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

import { AllExceptionsFilter } from './app/@common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.startAllMicroservices();

  const httpPort = environment.app.httpPort;
  await app.listen(httpPort);

  const domain = environment.app.domain;
  const appName = environment.app.name;
  Logger.log(`🚀 ${appName} is running on: ${domain}:${httpPort}`);
}

bootstrap();
