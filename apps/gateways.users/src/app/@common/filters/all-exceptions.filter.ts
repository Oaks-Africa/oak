import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
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

    return HttpException.createBody({}, message, status);
  }
}
