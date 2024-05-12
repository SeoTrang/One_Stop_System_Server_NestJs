import { Test, TestingModule } from '@nestjs/testing';
import { DocumentActivityTraceService } from './document-activity-trace.service';

describe('DocumentActivityTraceService', () => {
  let service: DocumentActivityTraceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentActivityTraceService],
    }).compile();

    service = module.get<DocumentActivityTraceService>(DocumentActivityTraceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
