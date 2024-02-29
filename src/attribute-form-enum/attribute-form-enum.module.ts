import { Module } from '@nestjs/common';
import { AttributeFormEnumController } from './attribute-form-enum.controller';
import { AttributeFormEnumService } from './attribute-form-enum.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeFormService } from 'src/attribute-form-service/entities/attributeFormService.entity';
import { AttributeFormEnum } from './entities/attributeFormEnum.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AttributeFormService, AttributeFormEnum])
  ],
  controllers: [AttributeFormEnumController],
  providers: [AttributeFormEnumService]
})
export class AttributeFormEnumModule {}
