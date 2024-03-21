import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ){}

    async create(createDepartmentDto: CreateDepartmentDto):Promise<any>{
        return await this.departmentRepository.save(createDepartmentDto);
    }

    async getAll():Promise<any>{
        return await this.departmentRepository.find();
    }

    async getAllDetail(): Promise<any> {
        const details = await this.departmentRepository.find({
            relations: {
                officers: true,
                documents: true,
                services: true
            }
        });
    
        const transformedDetails = details.map(detail => ({
            ...detail,
            officers: detail.officers.length,
            documents: detail.documents.length,
            services: detail.services.length
        }));
    
        return transformedDetails;
    }

    async delete(id: number): Promise<any> {
        return await this.departmentRepository.delete(id);
    }

    async update(id: number, department: CreateDepartmentDto):Promise<any>{
        
        return await this.departmentRepository.update(id,department);
    }
    
    
}
