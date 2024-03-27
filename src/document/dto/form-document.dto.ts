import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FormDocumentDto{
    @ApiProperty()
    @IsNotEmpty()
    service_id: number;

    @ApiProperty()
    @IsNotEmpty()
    attribute: any[]
}