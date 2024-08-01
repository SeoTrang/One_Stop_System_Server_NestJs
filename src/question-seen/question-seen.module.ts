import { Module } from '@nestjs/common';
import { QuestionSeenController } from './question-seen.controller';
import { QuestionSeenService } from './question-seen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionSeen } from './entities/questionSeen.entity';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionSeen, Question])
  ],
  controllers: [QuestionSeenController],
  providers: [QuestionSeenService]
})
export class QuestionSeenModule {}
