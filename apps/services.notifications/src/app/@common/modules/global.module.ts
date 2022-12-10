import { Global, Module } from '@nestjs/common';

import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { environment } from '../../../environments/environment';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: environment.mail.host,
        port: environment.mail.port,
        secure: true,
        auth: {
          user: environment.mail.username,
          pass: environment.mail.password,
        },
      },
      defaults: {
        from: environment.mail.from,
      },
      template: {
        dir: join(__dirname, 'assets/mails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MikroOrmModule.forRoot({ ...environment.database }),
  ],
  // exports: [MikroOrmModule],
})
export class GlobalModule {}
