import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Document } from './entities/document.entity';
import { Department } from 'src/department/entities/department.entity';
import { Service } from 'src/service/entities/service.entity';
import { ProceduralStep } from 'src/procedural-step/entities/proceduralStep.entity';
import { AttributeValue } from 'src/attribute-value/entities/attributeValue.entity';
import { AttributeValueService } from 'src/attribute-value/attribute-value.service';
import { AttributeFormService } from 'src/attribute-form-service/entities/attributeFormService.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Document,Department,Service,ProceduralStep,AttributeValue,AttributeFormService])
  ],
  controllers: [DocumentController],
  providers: [DocumentService,AttributeValueService]
})
export class DocumentModule {}
