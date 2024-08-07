import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionMediaContent } from 'src/question-media-content/entities/questionMediaContent.entity';
import { QuestionSeen } from 'src/question-seen/entities/questionSeen.entity';
import { Department } from 'src/department/entities/department.entity';
import { QuestionMediaContentService } from 'src/question-media-content/question-media-content.service';
import { User } from 'src/user/entities/user.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { ConversationsService } from 'src/conversations/conversations.service';
import { Conversation } from 'src/conversations/entities/conversations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question,QuestionMediaContent, QuestionSeen, Department, User, Officer, Conversation])
  ],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionMediaContentService, ConversationsService]
})
export class QuestionModule {}
