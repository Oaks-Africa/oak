import { Injectable, Logger } from '@nestjs/common';

import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MailerService } from '@nestjs-modules/mailer';

import { Email } from '../@common/entities/email.entity';

import { UserCreatedDto } from './dto/user-created.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger;

  constructor(
    private readonly mailerService: MailerService,
    private readonly orm: MikroORM,
    @InjectRepository(Email)
    private readonly emailRepository: EntityRepository<Email>
  ) {
    this.logger = new Logger(UsersService.name);
  }

  @UseRequestContext()
  async handleUserCreated(userCreatedDto: UserCreatedDto) {
    try {
      const {
        id,
        email,
        profile: {
          name: { first, last },
        },
      } = userCreatedDto;

      const request = {
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Oaks',
        template: './users/welcome', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: `${first} ${last}`,
          currentYear: new Date().getFullYear(),
        },
      };

      const response = await this.mailerService.sendMail({ ...request });

      let createEmail = this.emailRepository.create({
        request,
        recipient: id,
        sender: 'oaks',
        response,
        description: 'welcome',
      });

      await this.emailRepository.persistAndFlush(createEmail);
    } catch (e) {
      this.logger.error('EXCEPTION CAUGHT: ', e);
    }
  }
}
