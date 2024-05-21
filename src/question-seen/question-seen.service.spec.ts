import { Test, TestingModule } from '@nestjs/testing';
import { QuestionSeenService } from './question-seen.service';

describe('QuestionSeenService', () => {
  let service: QuestionSeenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionSeenService],
    }).compile();

    service = module.get<QuestionSeenService>(QuestionSeenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
