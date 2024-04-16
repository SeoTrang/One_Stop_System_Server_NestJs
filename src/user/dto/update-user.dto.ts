import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Gender } from "src/enum/enum";

export class FormUpdateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    identifier?: string;

    @ApiProperty()
    @IsNotEmpty()
    name?: string;

    @ApiProperty()
    @IsNotEmpty()
    batch?: string;

    @ApiProperty()
    @IsNotEmpty()
    in_class?: string;

    @ApiProperty()
    @IsNotEmpty()
    address?: string;

    @ApiProperty({enum: Gender})
    @IsNotEmpty()
    gender?: Gender;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsNotEmpty()
    phone?: string;

    @ApiProperty()
    avatar?: string;

    @ApiProperty()
    @IsNotEmpty()
    facultyId?: number;
}