import { Module } from '@nestjs/common';
import { AttributeFormServiceController } from './attribute-form-service.controller';
import { AttributeFormServiceService } from './attribute-form-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeFormService } from './entities/attributeFormService.entity';
import { Service } from 'src/service/entities/service.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AttributeFormService, Service])
  ],
  controllers: [AttributeFormServiceController],
  providers: [AttributeFormServiceService]
})
export class AttributeFormServiceModule {}
