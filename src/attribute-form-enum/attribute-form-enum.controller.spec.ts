import { Test, TestingModule } from '@nestjs/testing';
import { AttributeFormEnumController } from './attribute-form-enum.controller';

describe('AttributeFormEnumController', () => {
  let controller: AttributeFormEnumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeFormEnumController],
    }).compile();

    controller = module.get<AttributeFormEnumController>(AttributeFormEnumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
