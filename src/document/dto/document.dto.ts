import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DocumentDto{

    
    @ApiProperty()
    @IsNotEmpty()
    service_id: number;
    
    

}