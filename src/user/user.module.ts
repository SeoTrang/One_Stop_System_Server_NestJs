import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Faculties } from 'src/faculties/entities/faculties.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Faculties])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
