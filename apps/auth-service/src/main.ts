/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

async function bootstrap() {
  const grpcPort = environment.app.grpcPort;
  const domain = environment.app.domain;

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: "auth",
      protoPath: join(__dirname, "assets/protos/auth.proto"),
      url: `${domain}:${grpcPort}`
    }
  });
  await microservice.listen();
  Logger.log(
    `🚀 Microservice Application is running on: ${domain}:${grpcPort}`
  );

  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = environment.app.port;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
