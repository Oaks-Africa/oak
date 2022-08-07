import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MauthService } from './mauth.service';
import { CreateMauthDto } from './dto/create-mauth.dto';
import { UpdateMauthDto } from './dto/update-mauth.dto';

@Controller()
export class MauthController {
  constructor(private readonly mauthService: MauthService) {}

  @MessagePattern('createMauth')
  create(@Payload() createMauthDto: CreateMauthDto) {
    return this.mauthService.create(createMauthDto);
  }

  @MessagePattern('findAllMauth')
  findAll() {
    return this.mauthService.findAll();
  }

  @MessagePattern('findOneMauth')
  findOne(@Payload() id: number) {
    return this.mauthService.findOne(id);
  }

  @MessagePattern('updateMauth')
  update(@Payload() updateMauthDto: UpdateMauthDto) {
    return this.mauthService.update(updateMauthDto.id, updateMauthDto);
  }

  @MessagePattern('removeMauth')
  remove(@Payload() id: number) {
    return this.mauthService.remove(id);
  }
}
