import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindByEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
