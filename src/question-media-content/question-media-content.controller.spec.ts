import { Test, TestingModule } from '@nestjs/testing';
import { QuestionMediaContentController } from './question-media-content.controller';

describe('QuestionMediaContentController', () => {
  let controller: QuestionMediaContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionMediaContentController],
    }).compile();

    controller = module.get<QuestionMediaContentController>(QuestionMediaContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
