import { Service } from "src/service/entities/service.entity";

export class CreateAttributeFormServiceDto{
    name: string;
    type: string;
    service:Service;
}