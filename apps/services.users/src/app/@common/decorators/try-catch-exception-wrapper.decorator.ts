import { HttpException, Logger } from "@nestjs/common";

export const TryCatchExceptionWrapper =
  (exception: HttpException, logger?: Logger) => (target, key, descriptor) => {
    const fn = descriptor.value;
    descriptor.value = async (...args) => {
      try {
        await fn.apply(this, args);
      } catch (error) {
        logger?.error("EXCEPTION CAUGHT: ", error);

        if (error instanceof HttpException) {
          throw error;
        }

        throw exception;
      }
    };
  };
