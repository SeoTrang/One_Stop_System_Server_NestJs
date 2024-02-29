import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Department } from "src/department/entities/department.entity";

export class CreateOfficerDto{
    identifier: string;

    name: string;

    password: string;

    email: string;

    department: Department;

}