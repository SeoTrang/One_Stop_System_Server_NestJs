import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Department } from "src/department/entities/department.entity";
import { Service } from "src/service/entities/service.entity";

export class CreateFormFile{
    link: string;
    service: Service;
    department: Department;

    constructor(
        link: string,
        service: Service,
        department: Department
    )
    {
        this.link = link;
        this.service = service;
        this.department = department;
    }
}