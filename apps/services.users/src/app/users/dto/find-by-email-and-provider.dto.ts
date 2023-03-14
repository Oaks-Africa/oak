import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindByEmailAndProviderDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly provider: string;

  @IsNotEmpty()
  @IsString()
  readonly providerId: string;
}
