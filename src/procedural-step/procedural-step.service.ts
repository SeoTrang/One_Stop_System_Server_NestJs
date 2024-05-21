import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProceduralStep } from './entities/proceduralStep.entity';
import { Repository } from 'typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Service } from 'src/service/entities/service.entity';
import {ProceduralStepDto } from './dto/proceduralStep.dto';
import { CreateProceduralStepDto } from './dto/createProceduralStep.dto';
import { Officer } from 'src/officer/entities/officer.entity';

@Injectable()
export class ProceduralStepService {
    constructor(
        @InjectRepository(ProceduralStep) private proceduralStepRepository: Repository<ProceduralStep>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Service) private serviceRepository: Repository<Service>,
        @InjectRepository(Officer) private officerRepository: Repository<Officer>,
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


    async getUserProduraStep(step: number, service_id:number): Promise<any>{
        let proceduralStep = await this.proceduralStepRepository.findOne({
            where: {
                step: step,
                service: {
                    id: service_id
                }
            },

            relations: {
                department: true
            }
        })
        let department_id = proceduralStep.department.id;

        let users = await this.officerRepository.find({
            where: {
                department: {
                    id: department_id
                }
            }
        })

        let userIds = users.map((user) => {
            return {
                user_id: user.identifier,
                type_user: 'officer'
            }
        })

        return userIds;
    }

    async getById(id: number): Promise<ProceduralStep>{
        return await this.proceduralStepRepository.findOne({
            where: {
                id: id
            }
        })
    }
}
