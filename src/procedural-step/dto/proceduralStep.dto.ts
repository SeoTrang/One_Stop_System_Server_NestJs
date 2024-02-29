import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ProceduralStepDto{
    @ApiProperty()
    @IsNotEmpty()
    step: number;

    @ApiProperty()
    @IsNotEmpty()
    department_id: number;

    @ApiProperty()
    @IsNotEmpty()
    service_id:number;
}