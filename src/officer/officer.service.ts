import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Officer } from './entities/officer.entity';
import { FormOfficerDto } from './dto/formOfficer.dto';
import { CreateOfficerDto } from './dto/officer.dto';
import { Department } from 'src/department/entities/department.entity';

@Injectable()
export class OfficerService {
    constructor(
        @InjectRepository(Officer) private officerRepository: Repository<Officer>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ){}

    async create(formOfficerDto: FormOfficerDto):Promise<any>{
        const hashPass = await bcrypt.hash(formOfficerDto.password,10)
        let createOfficerDto = new CreateOfficerDto();
        let department = await this.departmentRepository.findOne({
            where:{
                id: Number(formOfficerDto.department_id)
            }
        })
        createOfficerDto.department = department;
        createOfficerDto.password = hashPass;
        createOfficerDto.email = formOfficerDto.email;
        createOfficerDto.name = formOfficerDto.name;
        createOfficerDto.identifier = formOfficerDto.identifier;
        
        return await this.officerRepository.save(createOfficerDto);
    }
}
