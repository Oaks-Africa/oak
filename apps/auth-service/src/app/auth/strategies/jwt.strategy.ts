import { Injectable } from "@nestjs/common";
import { PassportStrategy, PassportSerializer } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import { environment } from "../../../environments/environment";

import { User } from "../entities/user.entity";

import { JwtPayload } from "../interfaces/jwt-payload.interface";

import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: environment.jwt.ignoreExpiration,
      secretOrKey: environment.jwt.secret
    });
  }

  async validate(payload: JwtPayload): Promise<User> {

    const { userId } = payload;

    return await this.authService.findUserById(userId);
  }
}
