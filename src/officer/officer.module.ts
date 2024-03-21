import { Module } from '@nestjs/common';
import { OfficerController } from './officer.controller';
import { OfficerService } from './officer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Officer } from './entities/officer.entity';
import { Department } from 'src/department/entities/department.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Officer,Department,Role])
  ],
  controllers: [OfficerController],
  providers: [OfficerService, RoleService]
})
export class OfficerModule {}
