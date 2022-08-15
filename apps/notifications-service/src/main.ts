import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { environment } from "./environments/environment";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const port = environment.app.port;
  const appName = environment.app.name;

  await app.listen(port);
  Logger.log(
    `🚀 ${appName} Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
