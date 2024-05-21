import { Module } from '@nestjs/common';
import { ProceduralStepController } from './procedural-step.controller';
import { ProceduralStepService } from './procedural-step.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/service/entities/service.entity';
import { Department } from 'src/department/entities/department.entity';
import { ProceduralStep } from './entities/proceduralStep.entity';
import { Officer } from 'src/officer/entities/officer.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Service, Department, ProceduralStep, Officer])
  ],
  controllers: [ProceduralStepController],
  providers: [ProceduralStepService]
})
export class ProceduralStepModule {}
