import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy } from 'passport-google-oauth20';

import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger: Logger;

  constructor(config: ConfigService, private readonly auth: AuthService) {
    super({
      clientID: environment.google.client.id,
      clientSecret: environment.google.client.secret,
      callbackURL: environment.google.redirectUrl,
      scope: ['email', 'profile'],
    });

    this.logger = new Logger(GoogleOauthStrategy.name);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ) {
    // const { id, name, emails } = profile;
    this.logger.log('PROFILE: ', _refreshToken, _accessToken, profile);

    // Here a custom User object is returned. In the the repo I'm using a UsersService with repository pattern, learn more here: https://docs.nestjs.com/techniques/database
    return this.auth.validateGoogleUser({ email: 'abced', googleId: 'd' });
  }
}
