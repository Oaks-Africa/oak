import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindByEmailAndPasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
