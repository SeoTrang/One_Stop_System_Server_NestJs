import { Test, TestingModule } from '@nestjs/testing';
import { AttributeFormEnumService } from './attribute-form-enum.service';

describe('AttributeFormEnumService', () => {
  let service: AttributeFormEnumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeFormEnumService],
    }).compile();

    service = module.get<AttributeFormEnumService>(AttributeFormEnumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
