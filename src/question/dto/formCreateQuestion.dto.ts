import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { TypeQuestion } from "src/enum/enum";
import { CreateQuestionMediaContent } from "src/question-media-content/dto/createQuestionMediaContent.dto";

export class FormCreateQuestionDto{

    
    user_id?: number;

    @ApiProperty()
    @IsNotEmpty()
    department_id: number;

    @ApiProperty()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ type: 'enum', enum: TypeQuestion})
    type_question: TypeQuestion;


    type_user?: string;

    @ApiProperty()
    @IsNotEmpty()
    conversation_id: number;

    @ApiProperty({ type: [CreateQuestionMediaContent] })
    array_media_content?: CreateQuestionMediaContent[];

}