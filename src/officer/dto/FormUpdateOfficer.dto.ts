import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber } from "class-validator";

enum Gender{
    MALE = "male",
    FEMALE = "female"
}
export class FormUpdateOfficerDto{
  
    identifier?: string;


    name?: string;


    email?: string;

    phone?: string;

    department_id?: number;


    address?: string;

    avatar?: string;


    gender?: Gender;



}