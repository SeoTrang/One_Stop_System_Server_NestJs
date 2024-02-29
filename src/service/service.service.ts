import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ServiceDto } from './dto/service.dto';
import { Department } from 'src/department/entities/department.entity';
import { CreateServiceDto } from './dto/createService.dto';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Service) private serviceRepository: Repository<Service>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ){}

    async create(serviceDto: ServiceDto):Promise<any>{
        const department = await this.departmentRepository.findOne({
            where:{
                id: serviceDto.department_id
            }
        })

        if(!department) throw new HttpException('department_id not found',HttpStatus.BAD_REQUEST);
        let createServiceDto = new CreateServiceDto();
        createServiceDto.department = department;
        createServiceDto.name = serviceDto.name;
        createServiceDto.time_handle = serviceDto.time_handle;
        createServiceDto.type = serviceDto.type;
        createServiceDto.description = serviceDto.description;

        return await this.serviceRepository.save(createServiceDto);
        

    }
}
