import { NameDto } from './name.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfileDto {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => NameDto)
  readonly name: NameDto;
}
