import { Test, TestingModule } from '@nestjs/testing';
import { AttributeFormServiceController } from './attribute-form-service.controller';

describe('AttributeFormServiceController', () => {
  let controller: AttributeFormServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeFormServiceController],
    }).compile();

    controller = module.get<AttributeFormServiceController>(AttributeFormServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
