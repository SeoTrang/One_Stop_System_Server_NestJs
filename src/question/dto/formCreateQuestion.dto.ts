import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateQuestionMediaContent } from "src/question-media-content/dto/createQuestionMediaContent.dto";

export class FormCreateQuestionDto{

    
    user_id?: number;

    @ApiProperty()
    @IsNotEmpty()
    department_id: number;

    @ApiProperty()
    @IsNotEmpty()
    content: string;

    type_user?: string;

    @ApiProperty({ type: [CreateQuestionMediaContent] })
    array_media_content?: CreateQuestionMediaContent[];

}