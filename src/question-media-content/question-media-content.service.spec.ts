import { Test, TestingModule } from '@nestjs/testing';
import { QuestionMediaContentService } from './question-media-content.service';

describe('QuestionMediaContentService', () => {
  let service: QuestionMediaContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionMediaContentService],
    }).compile();

    service = module.get<QuestionMediaContentService>(QuestionMediaContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
