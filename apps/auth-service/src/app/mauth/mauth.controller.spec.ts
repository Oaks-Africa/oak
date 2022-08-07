import { Test, TestingModule } from '@nestjs/testing';
import { MauthController } from './mauth.controller';
import { MauthService } from './mauth.service';

describe('MauthController', () => {
  let controller: MauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MauthController],
      providers: [MauthService],
    }).compile();

    controller = module.get<MauthController>(MauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
