import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Officer } from 'src/officer/entities/officer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role,Officer])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
