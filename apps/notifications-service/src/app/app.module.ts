import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { environment } from '../../../users-service/src/environments/environment';

import { MailModule } from './mail/mail.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.username,
      password: environment.database.password,
      database: environment.database.database,
      autoLoadEntities: true,
      type: 'postgres',
      synchronize: true,
      logging: true,
    }),
    // MailerModule.forRoot({
    //   // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    //   // or
    //   transport: {
    //     host: 'smtp.example.com',
    //     secure: false,
    //     auth: {
    //       user: 'user@example.com',
    //       pass: 'topsecret',
    //     },
    //   },
    //   defaults: {
    //     from: '"No Reply" <noreply@example.com>',
    //   },
    //   template: {
    //     dir: join(__dirname, 'templates'),
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [environment.bus.rabbitmq.exchanges.notifications],
      uri: environment.bus.rabbitmq.url,
      connectionInitOptions: { wait: false },
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
