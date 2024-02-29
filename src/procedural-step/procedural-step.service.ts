import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProceduralStep } from './entities/proceduralStep.entity';
import { Repository } from 'typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Service } from 'src/service/entities/service.entity';
import {ProceduralStepDto } from './dto/proceduralStep.dto';
import { CreateProceduralStepDto } from './dto/createProceduralStep.dto';

@Injectable()
export class ProceduralStepService {
    constructor(
        @InjectRepository(ProceduralStep) private proceduralStepRepository: Repository<ProceduralStep>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Service) private serviceRepository: Repository<Service>
    ){}

    async create(proceduralStepDto: ProceduralStepDto): Promise<any>{
        const department = await this.departmentRepository.findOne({
            where:{
                id: Number(proceduralStepDto.department_id)
            }
        })

        if(!department) throw new HttpException('department_id not found', HttpStatus.BAD_REQUEST);
        
        const service = await this.serviceRepository.findOne({
            where:{
                id: Number(proceduralStepDto.service_id)
            }
        })

        if(!service) throw new HttpException('service_id not found', HttpStatus.BAD_REQUEST);
        
        let createProceduralStepDto = new CreateProceduralStepDto();
        createProceduralStepDto.step = proceduralStepDto.step;
        createProceduralStepDto.department = department;
        createProceduralStepDto.service = service;

        return await this.proceduralStepRepository.save(createProceduralStepDto);
    }
}
