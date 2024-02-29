import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ServiceDto{
    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    type:string;

    @ApiProperty()
    @IsNotEmpty()
    time_handle:number;

    @ApiProperty()
    @IsNotEmpty()
    department_id:number;

    @ApiProperty()
    description:string;


}