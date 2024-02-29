import { Department } from "src/department/entities/department.entity";
import { ProceduralStep } from "src/procedural-step/entities/proceduralStep.entity";
import { Service } from "src/service/entities/service.entity";

export class CreateDocumentDto{
    status: number;
    description: string;
    address: string;
    type_user: string;
    user_id: number;
    department: Department;
    service: Service;
    proceduralStep: ProceduralStep;
}