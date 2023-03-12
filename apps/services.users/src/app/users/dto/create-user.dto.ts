import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsUniqueEmail } from '../decorators/is-unique-email.decorator';

import { NameDto } from '../../@common/dto/name.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsUniqueEmail()
  readonly email: string;

  @ValidateIf((o) => !o.providerId)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @ValidateIf((o) => !o.password)
  @IsNotEmpty()
  @IsString()
  readonly provider?: string;

  @ValidateIf((o) => !o.password)
  @IsNotEmpty()
  @IsString()
  readonly providerId?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly avatar?: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => NameDto)
  readonly name: NameDto;
}
