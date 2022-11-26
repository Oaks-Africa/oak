import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { HealthCheckDto } from './dto/health-check.dto';
import { HealthCheckedDto } from './dto/health-checked.dto';

@Controller()
export class HealthController {
  @GrpcMethod('KycService', 'Health')
  check(data: HealthCheckDto, metadata: any) {
    return { status: 200 } as HealthCheckedDto;
  }
}
