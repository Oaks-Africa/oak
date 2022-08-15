import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { environment } from '../../../environments/environment';

import { Events } from '../../common/enums/events.enum';

import { AuthRegisteredEvent } from '../events/auth-registered.event';

@Injectable()
export class AuthRegisteredListener {
  private readonly logger: Logger;

  constructor(private readonly amqpConnection: AmqpConnection) {
    this.logger = new Logger(AuthRegisteredListener.name);
  }

  @OnEvent(Events.AUTH_REGISTERED, { async: true })
  async sendWelcomeEmail(event: AuthRegisteredEvent) {
    // handle and process "OrderCreatedEvent" event
    this.logger.log('SEND WELCOME EMAIL', { ...event });
    this.amqpConnection.publish(
      environment.bus.rabbitmq.exchanges.notifications.name,
      'notifications-route',
      event
    );
  }

  @OnEvent(Events.AUTH_REGISTERED, { async: true })
  sendVerificationEmail(event: AuthRegisteredEvent) {
    this.logger.log('SEND VERIFICATION EMAIL', { ...event });
  }

  @OnEvent(Events.AUTH_REGISTERED, { async: true })
  sendVerificationOtp(event: AuthRegisteredEvent) {
    this.logger.log('SEND VERIFICATION OTP', { ...event });
  }
}
