import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateDocumentDto{
    @ApiProperty({enum: ['confirm','cancel']})
    @IsNotEmpty()
    confirm: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    service_id: number;
}