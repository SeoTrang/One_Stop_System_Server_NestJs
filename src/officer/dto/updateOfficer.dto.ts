import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Department } from "src/department/entities/department.entity";

enum Gender{
    MALE = "male",
    FEMALE = "female"
}
export class UpdateOfficerDto{
  
    identifier?: string;


    name?: string;


    email?: string;

    phone?: string;

    department?: Department;


    address?: string;

    avatar?: string;


    gender?: Gender;



    
}