import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculties } from 'src/faculties/entities/faculties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faculties])],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
