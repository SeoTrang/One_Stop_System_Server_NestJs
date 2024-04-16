import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Faculties } from 'src/faculties/entities/faculties.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { OfficerService } from 'src/officer/officer.service';
import { Department } from 'src/department/entities/department.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Faculties, Officer,Department,Role])
  ],
  controllers: [UserController],
  providers: [UserService, OfficerService, RoleService]
})
export class UserModule {}
