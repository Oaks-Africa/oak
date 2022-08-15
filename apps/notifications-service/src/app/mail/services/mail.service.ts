import { Injectable, Logger } from '@nestjs/common';

import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

import { environment } from '../../../environments/environment';

@Injectable()
export class MailService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(MailService.name);
  }

  @RabbitRPC({
    exchange: environment.bus.rabbitmq.exchanges.notifications.name,
    routingKey: 'notifications-route',
    queue: 'mail-queue',
  })
  public async mailQueueHandler(msg: any) {
    this.logger.log('THIS IS THE MAIL QUEUE HANDLER', msg);

    return {
      response: 42,
    };
  }
}
