import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FormCreateQuestionDto } from './dto/formCreateQuestion.dto';
import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/user/entities/user.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { Conversation } from 'src/conversations/entities/conversations.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Officer) private officerRepository: Repository<Officer>,
        @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
    ){}

    async create(data: FormCreateQuestionDto): Promise<any>{
        let department:Department = await this.departmentRepository.findOne({
            where: {
                id: data.department_id
            }
        })

        let conversation = await this.conversationRepository.findOne({
            where: {
                id: data.conversation_id
            }
        })

        let question_save:Question = new Question();
        question_save.content = data.content;
        question_save.department = department;
        question_save.type_user = data.type_user;
        question_save.user_id = data.user_id;
        question_save.conversation = conversation;
        return await this.questionRepository.save(question_save);
    }

    async getLatestQuestionsByDepartment(department_id: number): Promise<any[]> {
        try {
            const latestQuestionSubquery = this.questionRepository.createQueryBuilder("question")
                .select("MAX(question.id)", "max_id")
                .where("question.departmentId = :department_id", { department_id })
                .groupBy("question.user_id");
    
            const latestQuestions = await this.questionRepository.createQueryBuilder("question")
                .where(`question.id IN (${latestQuestionSubquery.getQuery()})`)
                .setParameters(latestQuestionSubquery.getParameters())
                .getMany();
    
            const data = await Promise.all(latestQuestions.map(async (question) => {
                let user = null;
                if (question.type_user === 'student') {
                    user = await this.userRepository.findOne({
                        where: { id: question.user_id },
                        relations: { faculty: true }
                    });
                } else {
                    user = await this.officerRepository.findOne({
                        where: { id: question.user_id },
                        relations: { department: true }
                    });
                }
    
                return {
                    ...question,
                    user
                };
            }));
    
            return data;
        } catch (error) {
            console.error(error);
            throw new HttpException('server error: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
}
