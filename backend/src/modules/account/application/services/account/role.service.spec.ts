import { Test, TestingModule } from '@nestjs/testing';
import {AdminRoleService} from './role.service';

describe('AccountService', () => {
  let service: AdminRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminRoleService],
    }).compile();

    service = module.get<AdminRoleService>(AdminRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
