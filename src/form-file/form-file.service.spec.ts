import { Test, TestingModule } from '@nestjs/testing';
import { FormFileService } from './form-file.service';

describe('FormFileService', () => {
  let service: FormFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormFileService],
    }).compile();

    service = module.get<FormFileService>(FormFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
