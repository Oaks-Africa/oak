import { Reflector } from '@nestjs/core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map, Observable } from 'rxjs';

import { ResponseMessageKey } from '../decorators/response-message.decorator';

import { BaseResponseDto } from '../dto/base-response.dto';
import { HealthCheckedDto } from '../../health/dto/health-checked.dto';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponseDto<T> | T>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<BaseResponseDto<T> | T> {
    const message =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      'success';

    return next.handle().pipe(
      map((data) => {
        if (data instanceof HealthCheckedDto) {
          return data as T;
        }

        return {
          status: 200,
          success: true,
          message,
          data,
        };
      })
    );
  }
}
