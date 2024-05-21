import { TypeMediaContentQuestion } from "src/enum/enum";
import { Question } from "src/question/entities/question.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuestionMediaContent{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    url: string;

    @Column({ type: 'enum', enum: TypeMediaContentQuestion})
    type: TypeMediaContentQuestion;

    @ManyToOne(() => Question, (question) => question.questionMediaContents)
    question: Question;

}