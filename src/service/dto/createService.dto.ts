import { Department } from "src/department/entities/department.entity";

export class CreateServiceDto{
    name:string;
    type:string;
    time_handle:string;
    department:Department;
    description:string;
}