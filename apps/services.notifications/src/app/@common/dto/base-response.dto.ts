export class BaseResponseDto<T> {
  readonly success: boolean;

  readonly status: number;

  readonly data?: T;

  readonly message?: string;

  readonly error?: string;
}
