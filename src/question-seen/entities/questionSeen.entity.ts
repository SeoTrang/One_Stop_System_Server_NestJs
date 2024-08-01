import { Question } from "src/question/entities/question.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuestionSeen{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    type_user: string;

    @Column()
    user_id: number;
    
    @ManyToOne(() => Question, (question) => question.questionSeens)
    question: Question;
}