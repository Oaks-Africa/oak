import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
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

  @ValidateIf((o) => !o.viaGoogle)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly viaGoogle: boolean;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => NameDto)
  readonly name: NameDto;
}
