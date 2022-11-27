import { Injectable } from '@nestjs/common';

import { Activities, Activity } from 'nestjs-temporal';

export interface IUserCreatedActivity {
  sendWelcomeMail(name: string): Promise<string>;
}

@Injectable()
@Activities()
export class UserCreatedActivity {
  @Activity()
  async sendWelcomeMail(name: string): Promise<string> {
    return 'Hello ' + name;
  }
}
