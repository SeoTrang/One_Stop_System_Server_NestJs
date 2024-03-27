import { Module } from '@nestjs/common';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculties } from './entities/faculties.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Faculties])
  ],
  controllers: [FacultiesController],
  providers: [FacultiesService]
})
export class FacultiesModule {}
