import { Test, TestingModule } from '@nestjs/testing';
import { NormalUserAccountService } from './normaluser.service';

describe('NormalUserAccountService', () => {
  let service: NormalUserAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NormalUserAccountService],
    }).compile();

    service = module.get<NormalUserAccountService>(NormalUserAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
