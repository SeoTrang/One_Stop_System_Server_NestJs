import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionMediaContent } from './entities/questionMediaContent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionMediaContentService {
    constructor(
        @InjectRepository(QuestionMediaContent) private questionMediaRepository: Repository<QuestionMediaContent>

    ){}


    async createMultiple(questionMediaContents: QuestionMediaContent[]): Promise<QuestionMediaContent[]> {
        const savePromises = questionMediaContents.map(questionMediaContent => 
            this.questionMediaRepository.save(questionMediaContent)
        );
    
        return Promise.all(savePromises);
    }
}
