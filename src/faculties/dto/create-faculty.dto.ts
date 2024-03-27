import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateFacultyDto{
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}