/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { Partitioners } from 'kafkajs';

import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

import { AllExceptionsFilter } from './app/@common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: environment.kafka.clientId,
          brokers: [...environment.kafka.brokers],
        },
        consumer: {
          groupId: environment.kafka.consumers.notifications.id,
        },
        producer: {
          createPartitioner: Partitioners.DefaultPartitioner,
        },
      },
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();

  const port = environment.app.httpPort;
  await app.listen(port);

  const domain = environment.app.domain;
  const appName = environment.app.name;
  Logger.log(`🚀 ${appName} is running on: ${domain}:${port}`);
}

bootstrap();
