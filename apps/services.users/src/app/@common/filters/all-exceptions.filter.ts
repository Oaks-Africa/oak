import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';

import { Observable, of } from 'rxjs';

import { BaseResponseDto } from '../dto/base-response.dto';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<BaseResponseDto<any>> {
    const { response = {}, status } = exception;
    const { message, error } = response;

    const exceptionResponse = {
      status: status ?? 500,
      success: false,
      error: error?.toLowerCase() ?? 'error occurred',
      message:
        typeof message === 'string'
          ? message?.toLowerCase()
          : message?.[0]?.toLowerCase() ?? 'error occurred',
    };

    return of(exceptionResponse);
  }
}
