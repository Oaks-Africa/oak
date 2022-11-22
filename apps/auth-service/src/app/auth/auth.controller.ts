import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

import { AuthService } from './auth.service';

import { RegisterDto } from './dtos/register.dto';
import { ValidateJwtDto } from './dtos/validate-jwt.dto';

@Controller()
export class AuthController {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @GrpcMethod('AuthService', 'Register')
  async register(
    data: RegisterDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ) {
    this.logger.log('Register', data);
    return await this.authService.register(data);
  }

  @GrpcMethod('AuthService', 'ValidateJwt')
  async validateJwt(
    data: ValidateJwtDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ) {
    this.logger.log('ValidateJwt', data);
    return await this.authService.validateJwt(data);
  }
}
