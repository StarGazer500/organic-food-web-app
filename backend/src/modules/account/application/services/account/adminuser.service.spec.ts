import { Test, TestingModule } from '@nestjs/testing';
import { AdminAccountService } from './adminuser.service';

describe('AdminAccountService', () => {
  let service: AdminAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAccountService],
    }).compile();

    service = module.get<AdminAccountService>(AdminAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
