import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { FormFile } from './entities/formFile.entity';
import { Repository } from 'typeorm';
import { CreateFormFile } from './dto/create-form-file.dto';
import { FormFormFile } from './dto/form-form-file.dto';
import { Service } from 'src/service/entities/service.entity';
import { Department } from 'src/department/entities/department.entity';

@Injectable()
export class FormFileService {

    constructor(
        @InjectRepository(FormFile) private formFileRepository: Repository<FormFile>,
        @InjectRepository(Service) private serviceRepository: Repository<Service>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,

    ){}

    async create(formFormFile: FormFormFile):Promise<any> {
        const service:Service = await this.serviceRepository.findOne({
            where: {
                id: Number(formFormFile.serviceId)
            }
        })

        const department = await this.departmentRepository.findOne({
            where:{
                id: Number(formFormFile.departmentId)
            }
        })

        let createFormFile = new CreateFormFile(
            formFormFile.link,
            service,
            department
        );


        return await this.formFileRepository.save(createFormFile);
    }
}
