import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Department } from 'src/department/entities/department.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Service,Department])
  ],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
