import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { TypeMediaContentQuestion } from "src/enum/enum";

export class CreateQuestionMediaContent{
    @ApiProperty()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ type: 'enum', enum: TypeMediaContentQuestion})
    type: TypeMediaContentQuestion

    
}