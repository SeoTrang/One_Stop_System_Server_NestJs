import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class FormFormFile{
    @ApiProperty()
    @IsNotEmpty()
    link: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    serviceId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    departmentId: number;
}