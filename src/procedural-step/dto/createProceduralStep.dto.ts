import { Department } from "src/department/entities/department.entity";
import { Service } from "src/service/entities/service.entity";

export class CreateProceduralStepDto{
    step: number;
    department: Department;
    service: Service;
}