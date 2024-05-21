import { Injectable } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FormCreateQuestionDto } from './dto/formCreateQuestion.dto';
import { Department } from 'src/department/entities/department.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ){}

    async create(data: FormCreateQuestionDto): Promise<any>{
        let department:Department = await this.departmentRepository.findOne({
            where: {
                id: data.department_id
            }
        })

        let question_save:Question = new Question();
        question_save.content = data.content;
        question_save.department = department;
        question_save.type_user = data.type_user;
        question_save.user_id = data.user_id;
        return await this.questionRepository.save(question_save);
    }
}
