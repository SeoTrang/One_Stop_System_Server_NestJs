import { Module } from '@nestjs/common';
import { QuestionSeenController } from './question-seen.controller';
import { QuestionSeenService } from './question-seen.service';

@Module({
  controllers: [QuestionSeenController],
  providers: [QuestionSeenService]
})
export class QuestionSeenModule {}
