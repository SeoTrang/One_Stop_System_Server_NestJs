import { Test, TestingModule } from '@nestjs/testing';
import { DocumentActivityTraceController } from './document-activity-trace.controller';

describe('DocumentActivityTraceController', () => {
  let controller: DocumentActivityTraceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentActivityTraceController],
    }).compile();

    controller = module.get<DocumentActivityTraceController>(DocumentActivityTraceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
