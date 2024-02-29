import { Test, TestingModule } from '@nestjs/testing';
import { PostMediaContentService } from './post-media-content.service';

describe('PostMediaContentService', () => {
  let service: PostMediaContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostMediaContentService],
    }).compile();

    service = module.get<PostMediaContentService>(PostMediaContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
