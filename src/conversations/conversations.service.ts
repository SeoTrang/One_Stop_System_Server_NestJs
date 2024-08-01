import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entities/conversations.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';
import { Question } from 'src/question/entities/question.entity';
import { Officer } from 'src/officer/entities/officer.entity';

@Injectable()
export class ConversationsService {
    constructor(
        @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Officer) private officerRepository: Repository<Officer>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Question) private questionRepository: Repository<Question>,
    ){}

    async create(user_id: number, department_id: number): Promise<any>{
        const user = await this.userRepository.findOne({
            where: {
                id: user_id
            }
        })

        const department = await this.departmentRepository.findOne({
            where: {
                id: department_id
            }
        })

        let conversationSave = new Conversation();
        conversationSave.user = user;
        conversationSave.department = department;

        return await this.conversationRepository.save(conversationSave);
    }

    async getAllByDepartment(department_id: number): Promise<any> {
        let data: any = await this.conversationRepository.find({
            where: {
                department: {
                    id: department_id
                }
            },
            relations: {
                user: {
                    faculty: true
                },
                department: true
            }
        })

        let dataPromise = data.map(async(d) => {
            console.log(d.id);
            
            let latestQuestions = await this.questionRepository.findOne({
                where: {
                    conversation: {
                        id: d.id
                    }
                },
                relations: {
                    questionSeens: true
                },
                order: {
                    created_at: 'DESC'
                }
            });
            console.log(latestQuestions);
            
            // d.latestQuestions = latestQuestions;

            return {
                ...d,
                latestQuestions: latestQuestions
            }
        })

        let result = await Promise.all(dataPromise);
        return result;
    }

    async getAllByUser(user_id: number): Promise<any> {
        let data: any = await this.conversationRepository.find({
            where: {
                user: {
                    id: user_id
                }
            },
            relations: {
                user: {
                    faculty: true
                },
                department: true
            }
        })

        let dataPromise = data.map(async(d) => {
            console.log(d.id);
            
            let latestQuestions = await this.questionRepository.findOne({
                where: {
                    conversation: {
                        id: d.id
                    }
                },
                relations: {
                    questionSeens: true
                },
                order: {
                    created_at: 'DESC'
                }
            });
            console.log(latestQuestions);
            
            // d.latestQuestions = latestQuestions;

            return {
                ...d,
                latestQuestions: latestQuestions
            }
        })

        let result = await Promise.all(dataPromise);
        return result;
    }

    async getDetailConversation(id:number): Promise<any>{
        let data = await this.conversationRepository.findOne({
            where: {
                id: id
            },
            relations: {
                questions: {
                    questionMediaContents: true
                },
                

            }
        })

        let dataPromise = data.questions.map(async(d) => {
            let user:any = null;
            if(d.type_user == 'student'){
                user = await this.userRepository.findOne({
                    where: {
                        id: d.user_id
                    },
                    relations: {
                        faculty: true
                    }
                })
            }else{
                user = await this.officerRepository.findOne({
                    where: {
                        id: d.user_id
                    },
                    relations: {
                        department: true
                    }
                })
            }

            return {
                ...d,
                user: user
            }
        })

        let result = await Promise.all(dataPromise);
        return result;
    }
}
