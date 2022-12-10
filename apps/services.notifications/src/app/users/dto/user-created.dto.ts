import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ProfileDto } from './profile.dto';

export class UserCreatedDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly viaGoogle: boolean;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => ProfileDto)
  readonly profile: ProfileDto;

  @IsNotEmpty()
  @IsDateString()
  createdAt: string;
}
