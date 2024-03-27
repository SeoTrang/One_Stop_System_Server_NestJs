import { Test, TestingModule } from '@nestjs/testing';
import { FormFileController } from './form-file.controller';

describe('FormFileController', () => {
  let controller: FormFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormFileController],
    }).compile();

    controller = module.get<FormFileController>(FormFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
