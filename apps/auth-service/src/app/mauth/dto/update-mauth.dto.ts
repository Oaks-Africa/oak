import { PartialType } from '@nestjs/mapped-types';
import { CreateMauthDto } from './create-mauth.dto';

export class UpdateMauthDto extends PartialType(CreateMauthDto) {
  id: number;
}
