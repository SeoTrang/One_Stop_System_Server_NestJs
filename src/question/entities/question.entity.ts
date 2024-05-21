import { Department } from "src/department/entities/department.entity";
import { QuestionMediaContent } from "src/question-media-content/entities/questionMediaContent.entity";
import { QuestionSeen } from "src/question-seen/entities/questionSeen.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Question{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text')
    content: string;

    @Column()
    type_user: string;

    @Column()
    user_id: number;

    @ManyToOne(() => Department, (department) => department.questions)
    department: Department;


    @OneToMany(() => QuestionMediaContent, (questionmediaContent) => questionmediaContent.question)
    questionMediaContents: QuestionMediaContent[];

    @OneToMany(() => QuestionSeen, (questionSeen) => questionSeen.question)
    questionSeens: QuestionSeen[];
}