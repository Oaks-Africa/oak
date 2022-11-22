import { IsEmail, IsNotEmpty } from 'class-validator';

import { UniqueEmail } from '../decorators/unique-email.decorator';

export class RegisterDto {
  @IsEmail()
  @UniqueEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
