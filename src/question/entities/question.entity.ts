import { Conversation } from "src/conversations/entities/conversations.entity";
import { Department } from "src/department/entities/department.entity";
import { TypeQuestion } from "src/enum/enum";
import { QuestionMediaContent } from "src/question-media-content/entities/questionMediaContent.entity";
import { QuestionSeen } from "src/question-seen/entities/questionSeen.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({type: 'enum', enum: TypeQuestion})
    type_question: TypeQuestion;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Department, (department) => department.questions)
    department: Department;


    @OneToMany(() => QuestionMediaContent, (questionmediaContent) => questionmediaContent.question)
    questionMediaContents: QuestionMediaContent[];

    @OneToMany(() => QuestionSeen, (questionSeen) => questionSeen.question)
    questionSeens: QuestionSeen[];

    @ManyToOne(() => Conversation, (conversation) => conversation.questions)
    conversation: Conversation;
}