import { Test, TestingModule } from '@nestjs/testing';
import { AttributeFormServiceService } from './attribute-form-service.service';

describe('AttributeFormServiceService', () => {
  let service: AttributeFormServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeFormServiceService],
    }).compile();

    service = module.get<AttributeFormServiceService>(AttributeFormServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
