import { User } from "../entities/user.entity";

import { Auth } from "../interfaces/auth.interface";

export class RegisteredDto {
  user: User;

  auth: Auth;
}
