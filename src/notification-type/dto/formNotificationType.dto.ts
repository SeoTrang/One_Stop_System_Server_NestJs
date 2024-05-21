import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FormNotificationType{
    @ApiProperty()
    @IsNotEmpty()
    type: string;
}