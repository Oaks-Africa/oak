/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { join } from "path";

import { useContainer } from "class-validator";

import { environment } from "./environments/environment";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  const port = environment.app.port;
  const domain = environment.app.domain;
  const appName = environment.app.name;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: "auth",
        protoPath: join(__dirname, "assets/protos/auth.proto"),
        url: `${domain}:${port}`
      }
    }
  );

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen();
  Logger.log(
    `🚀 ${appName} Microservice Application is running on: ${domain}:${port}`
  );
}

bootstrap();
