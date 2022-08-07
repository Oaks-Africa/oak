import { Test, TestingModule } from '@nestjs/testing';
import { MauthService } from './mauth.service';

describe('MauthService', () => {
  let service: MauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MauthService],
    }).compile();

    service = module.get<MauthService>(MauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
