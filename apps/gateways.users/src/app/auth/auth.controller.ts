import { Controller, Get, UseGuards } from "@nestjs/common";
import { LoginWithGoogleGuard } from "./guards/login-with-google.guard";

@Controller('auth')
export class AuthController {
  @Get('google/redirect')
  @UseGuards(LoginWithGoogleGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }

}
