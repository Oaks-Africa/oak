import { User } from "../entities/user.entity";

import { Auth } from "../interfaces/auth.interface";

export class JwtValidatedDto {
  user: User;

  auth: Auth;
}
