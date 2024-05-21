import { Module } from '@nestjs/common';
import { QuestionMediaContentController } from './question-media-content.controller';
import { QuestionMediaContentService } from './question-media-content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionMediaContent } from './entities/questionMediaContent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionMediaContent])
  ],
  controllers: [QuestionMediaContentController],
  providers: [QuestionMediaContentService]
})
export class QuestionMediaContentModule {}
