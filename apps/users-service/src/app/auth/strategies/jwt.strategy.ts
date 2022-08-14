import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<User> {
    const bearerToken = request.headers.get('Authorization');
    const jwt = bearerToken.replace('Bearer ', '');

    return await this.authService.validateJwt(jwt);
  }
}
