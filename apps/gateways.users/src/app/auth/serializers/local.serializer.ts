import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UserOutput } from '../dto/user.output';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: UserOutput, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(user: UserOutput, done: CallableFunction) {
    done(null, user);
  }
}
