import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversations.entity';
import { User } from 'src/user/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';
import { Question } from 'src/question/entities/question.entity';
import { Officer } from 'src/officer/entities/officer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, User, Department, Question, Officer])
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService]
})
export class ConsersationsModule {}
