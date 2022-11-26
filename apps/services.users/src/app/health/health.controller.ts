import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { USERS_SERVICE_NAME } from '../@common/constants/app.constant';

import { HealthCheckDto } from './dto/health-check.dto';
import { HealthCheckedDto } from './dto/health-checked.dto';

@Controller()
export class HealthController {
  @GrpcMethod(USERS_SERVICE_NAME, 'Health')
  check(data: HealthCheckDto, metadata: any) {
    return { status: 200 } as HealthCheckedDto;
  }
}
