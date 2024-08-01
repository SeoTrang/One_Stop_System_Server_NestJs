import { Entity } from "typeorm";

@Entity()
export class FormCreateQuestionSeenDto{
    
    type_user: string;
    user_id: number;

}