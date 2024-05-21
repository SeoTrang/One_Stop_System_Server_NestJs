import { Test, TestingModule } from '@nestjs/testing';
import { QuestionSeenController } from './question-seen.controller';

describe('QuestionSeenController', () => {
  let controller: QuestionSeenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionSeenController],
    }).compile();

    controller = module.get<QuestionSeenController>(QuestionSeenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
