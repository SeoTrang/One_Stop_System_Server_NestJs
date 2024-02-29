import { Module } from '@nestjs/common';
import { OfficerController } from './officer.controller';
import { OfficerService } from './officer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Officer } from './entities/officer.entity';
import { Department } from 'src/department/entities/department.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Officer,Department])
  ],
  controllers: [OfficerController],
  providers: [OfficerService]
})
export class OfficerModule {}
