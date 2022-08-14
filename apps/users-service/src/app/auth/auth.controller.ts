import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  validateJwt() {
    this.logger.log("Heeey from this side of the show");
    return this.authService.validateJwt('hdhdkfdkhfkdhfdkhfkdf');
  }
}
