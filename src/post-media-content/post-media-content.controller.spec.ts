import { Test, TestingModule } from '@nestjs/testing';
import { PostMediaContentController } from './post-media-content.controller';

describe('PostMediaContentController', () => {
  let controller: PostMediaContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostMediaContentController],
    }).compile();

    controller = module.get<PostMediaContentController>(PostMediaContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
