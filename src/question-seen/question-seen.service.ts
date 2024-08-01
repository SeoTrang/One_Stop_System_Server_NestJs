import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionSeen } from './entities/questionSeen.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class QuestionSeenService {
    constructor(
        @InjectRepository(QuestionSeen) private questionSeenRepository: Repository<QuestionSeen>,
        @InjectRepository(Question) private questionRepository: Repository<Question>,
    ){}

    async create (question_id: number, user_id: number, type_user: string): Promise<any>{
        try {
            const question = await this.questionRepository.findOne({
                where: {
                    id: question_id
                }
            })
            const questionSeensave = new QuestionSeen();
            questionSeensave.question = question;
            questionSeensave.type_user = type_user;
            questionSeensave.user_id = user_id;

            await this.questionSeenRepository.save(questionSeensave);
        } catch (error) {
            console.log(error);
            return new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);
            
        }
    }
}
