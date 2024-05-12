import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { StatusDocumentActivityTrace } from "src/enum/enum";

export class CreateDocTraceDto{
    @ApiProperty()
    @IsNotEmpty()
    officerId : number;

    @ApiProperty()
    @IsNotEmpty()
    documentId : number;

    @ApiProperty()
    @IsNotEmpty()
    proceduralStepId : number;

    @ApiProperty()
    @IsNotEmpty()
    status: StatusDocumentActivityTrace
}