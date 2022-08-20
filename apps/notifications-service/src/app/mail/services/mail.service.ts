import { Injectable, Logger } from "@nestjs/common";

import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { MailerService } from "@nestjs-modules/mailer";

import { environment } from "../../../environments/environment";

@Injectable()
export class MailService {
  private readonly logger: Logger;

  constructor(private readonly mailerService: MailerService) {
    this.logger = new Logger(MailService.name);
  }

  @RabbitRPC({
    exchange: environment.bus.rabbitmq.exchanges.notifications.name,
    routingKey: "notifications-route",
    queue: "mail-queue"
  })
  public async mailQueueHandler(msg: any) {
    this.logger.log("THIS IS THE MAIL QUEUE HANDLER", msg);
    const { user } = msg;

    const d = await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Welcome to Oaks",
      template: "./auth/welcome", // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.email
      }
    });

    this.logger.log(d, 'HHEKEHKEHRKE');

    return {
      response: 42
    };
  }
}
