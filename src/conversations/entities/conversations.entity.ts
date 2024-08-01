import { Department } from "src/department/entities/department.entity";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Conversation{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Department, (department) => department.conversations)
    department: Department;

    @ManyToOne(() => User, (user) => user.conversations)
    user: User;

    @OneToMany(() => Question, (question) => question.conversation)
    questions: Question[];
}