import { Test, TestingModule } from '@nestjs/testing';
import { NormaluserController } from './normaluser.controller';

describe('NormaluserController', () => {
  let controller: NormaluserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NormaluserController],
    }).compile();

    controller = module.get<NormaluserController>(NormaluserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
