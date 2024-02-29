import { Test, TestingModule } from '@nestjs/testing';
import { ProceduralStepController } from './procedural-step.controller';

describe('ProceduralStepController', () => {
  let controller: ProceduralStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProceduralStepController],
    }).compile();

    controller = module.get<ProceduralStepController>(ProceduralStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
