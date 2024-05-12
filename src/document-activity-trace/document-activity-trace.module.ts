import { Module } from '@nestjs/common';
import { DocumentActivityTraceController } from './document-activity-trace.controller';
import { DocumentActivityTraceService } from './document-activity-trace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentActivityTrace } from './entities/documentActivityTrace.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { Document } from 'src/document/entities/document.entity';
import { ProceduralStep } from 'src/procedural-step/entities/proceduralStep.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentActivityTrace, Officer, Document, ProceduralStep])
  ],
  controllers: [DocumentActivityTraceController],
  providers: [DocumentActivityTraceService]
})
export class DocumentActivityTraceModule {}
