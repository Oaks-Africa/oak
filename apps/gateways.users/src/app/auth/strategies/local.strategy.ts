import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy } from 'passport-custom';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'ccc') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request) {
    const body: any = req.body;
    console.log(req.body, 'THIS IS TOKEN');
    // return true;
    return await this.authService.validateUserByEmailAndPassword({
      email: body.email,
      password: body.password,
    });
  }
}
