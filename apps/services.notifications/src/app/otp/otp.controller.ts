import { Controller } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller()
export class OtpController {
  constructor(private readonly otpService: OtpService) {}
}
