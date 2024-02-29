import { Test, TestingModule } from '@nestjs/testing';
import { ProceduralStepService } from './procedural-step.service';

describe('ProceduralStepService', () => {
  let service: ProceduralStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProceduralStepService],
    }).compile();

    service = module.get<ProceduralStepService>(ProceduralStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
