import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-custom';

import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger: Logger;

  constructor(private readonly auth: AuthService) {
    super();

    this.logger = new Logger(GoogleOauthStrategy.name);
  }

  async validate(req: Request) {
    const body: any = req.body;

    return await this.auth.validateUserViaProvider({
      idToken: body.idToken,
    });
  }
}
