import { Module } from '@nestjs/common';
import { AttributeValueController } from './attribute-value.controller';
import { AttributeValueService } from './attribute-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from './entities/attributeValue.entity';
import { Document } from 'src/document/entities/document.entity';
import { AttributeFormService } from 'src/attribute-form-service/entities/attributeFormService.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AttributeValue,Document,AttributeFormService])
  ],
  controllers: [AttributeValueController],
  providers: [AttributeValueService]
})
export class AttributeValueModule {}
