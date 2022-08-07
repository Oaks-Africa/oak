import { Injectable } from '@nestjs/common';
import { CreateMauthDto } from './dto/create-mauth.dto';
import { UpdateMauthDto } from './dto/update-mauth.dto';

@Injectable()
export class MauthService {
  create(createMauthDto: CreateMauthDto) {
    return 'This action adds a new mauth';
  }

  findAll() {
    return `This action returns all mauth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mauth`;
  }

  update(id: number, updateMauthDto: UpdateMauthDto) {
    return `This action updates a #${id} mauth`;
  }

  remove(id: number) {
    return `This action removes a #${id} mauth`;
  }
}
