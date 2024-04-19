import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import { DocumentDto } from './dto/document.dto';
import { ProceduralStep } from 'src/procedural-step/entities/proceduralStep.entity';
import { CreateDocumentDto } from './dto/createDocument.dto';
import { UpdateDocumentDto } from './dto/updateDocment.dto';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document) private documentRepository: Repository<Document>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Service) private serviceRepository: Repository<Service>,
        @InjectRepository(ProceduralStep) private proceduralStepRepository: Repository<ProceduralStep>,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async create(user_id:number, type_user:string, service_id:number):Promise<any>{
        const department = await this.departmentRepository.findOne({
            where:{
                services:{
                    id: service_id
                }
            }
        })

        const service = await this.serviceRepository.findOne({
            where:{
                id: service_id
            }
        })

        const proceduralStep = await this.proceduralStepRepository.findOne({
            where:{
                step: 1,
                service:{
                    id: service_id
                }
            }
        })
        // console.log(department);
        

        let createDocumentDto = new CreateDocumentDto();
        createDocumentDto.service = service;
        createDocumentDto.department = department;
        createDocumentDto.proceduralStep = proceduralStep;
        createDocumentDto.address = department.address;
        createDocumentDto.status = 1;
        createDocumentDto.user_id = user_id;
        createDocumentDto.type_user = type_user;

        return await this.documentRepository.save(createDocumentDto);
        return true;

    }


    async update(document_id: number, updateDocumentDto: UpdateDocumentDto):Promise<any>{
        const proceduralSteps = await this.proceduralStepRepository.find({
            where:{
                service:{
                    id: Number(updateDocumentDto.service_id)
                }
            },
            relations:{
                department: true
            }
        })
        // console.log(proceduralSteps);
        proceduralSteps.sort((a, b) => a.step - b.step);

        console.log(proceduralSteps);
        const document = await this.documentRepository.findOne({
            where:{
                id: document_id
            },
            relations:{
                proceduralStep: true
            }
        })

        if(updateDocumentDto.confirm !== 'confirm'){
            document.status = 0;
            document.description = updateDocumentDto.description;
            return {}
        }

        let nextDepartment = null;
        console.log(document);
        let index = 0;
        for(index = 0; index < proceduralSteps.length; index++){
            // console.log(document.proceduralStep.step);
            // console.log(proceduralSteps[index].step);
            
            if(document.proceduralStep.step == proceduralSteps[index].step){
                document.proceduralStep = proceduralSteps[index+1];
                document.proceduralStep.step = proceduralSteps[index+1].step;
                nextDepartment = proceduralSteps[index+1].department;
                break;
            }
        }
        // let nextDepartment = proceduralSteps[index+1].department;
        console.log('===============================');
        
        console.log(document);
        console.log(nextDepartment);

        document.address = nextDepartment.address;

        console.log('===============================end');
        console.log(document);
        

        
        // const department = await this.departmentRepository.findOne({


        // })

        

        return await this.documentRepository.update(document.id,document);
        
    }
}
