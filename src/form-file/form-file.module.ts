import { Module } from '@nestjs/common';
import { FormFileController } from './form-file.controller';
import { FormFileService } from './form-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFile } from './entities/formFile.entity';
import { Service } from 'src/service/entities/service.entity';
import { Department } from 'src/department/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormFile,Service, Department])],
  controllers: [FormFileController],
  providers: [FormFileService]
})
export class FormFileModule {}
