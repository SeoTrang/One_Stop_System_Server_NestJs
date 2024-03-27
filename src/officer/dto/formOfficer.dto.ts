import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber } from "class-validator";

enum Gender{
    MALE = "male",
    FEMALE = "female"
}
export class FormOfficerDto{
    @ApiProperty()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    department_id: number;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty({enum: ['male', 'female']})
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

}