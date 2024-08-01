import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ConversationDto{

    @IsNotEmpty()
    @ApiProperty()
    user_id: number;

    @IsNotEmpty()
    @ApiProperty()
    department_id: number;
}