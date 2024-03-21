import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Department } from "src/department/entities/department.entity";
import { Role } from "src/role/entities/role.entity";
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class CreateOfficerDto {
    identifier: string;
    name: string;
    password: string;
    email: string;
    department: Department;
    roles?: Role[];
    address: string;
    gender: Gender; // Sử dụng kiểu Gender thay vì string
    avatar?: string;
}