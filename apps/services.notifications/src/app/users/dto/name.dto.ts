import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class NameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly first: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly last: string;

  @IsOptional()
  @MaxLength(100)
  readonly other?: string;
}
