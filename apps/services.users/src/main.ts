import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { useContainer } from 'class-validator';

import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

import { AllExceptionsFilter } from './app/@common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: environment.app.package,
        protoPath: join(__dirname, 'assets/proto/users.proto'),
        url: environment.app.url,
      },
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();

  const httpPort = environment.app.httpPort;
  await app.listen(httpPort);

  const appName = environment.app.name;
  Logger.log(`🚀 ${appName} is running on: ${environment.app.url}`);
}

bootstrap();
