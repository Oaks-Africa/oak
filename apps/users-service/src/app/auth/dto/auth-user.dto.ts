import { User } from "../entities/user.entity";

import { AuthDto } from "./auth.dto";

export class AuthUserDto {
  public user: User;

  public auth: AuthDto;
}
