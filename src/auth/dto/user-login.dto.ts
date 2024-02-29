import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto{
    @IsNotEmpty()
    @ApiProperty()
    identifier:string;

    @IsNotEmpty()
    @ApiProperty()
    password:string;
}