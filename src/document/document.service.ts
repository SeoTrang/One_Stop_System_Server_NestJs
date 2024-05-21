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
import { AttributeFormEnum } from 'src/attribute-form-enum/entities/attributeFormEnum.entity';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document) private documentRepository: Repository<Document>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Service) private serviceRepository: Repository<Service>,
        @InjectRepository(ProceduralStep) private proceduralStepRepository: Repository<ProceduralStep>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(AttributeFormEnum) private attributeFormEnumRepository: Repository<AttributeFormEnum>
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


    // async updateStatus(id: number, updateDocumentDto):Promise<UpdateResult>{
    //     let document:Document = await this.documentRepository.findOne({
    //         where:{
    //             id: id
    //         },
    //         relations: {
    //             proceduralStep: true
    //         }
    //     })
    //     let proceduralSteps = await this.proceduralStepRepository.find({
    //         where:{
    //             documents:{
    //                 id: id
    //             }
    //         }
    //     })
    //     if(updateDocumentDto.confirm !== 'confirm'){
    //         document.status = 0;
    //         document.description = updateDocumentDto.description;
    //         return {}
    //     }
    //     proceduralSteps.sort((a,b) => a.step - b.step);

    //     for (let index = 0; index < proceduralSteps.length; index++) {
    //         if(document.proceduralStep.id === proceduralSteps[index].id){
    //             document.proceduralStep = proceduralSteps[index];
    //         }
            
    //     }


    // }
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

        // console.log(proceduralSteps);

        


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
            return await this.documentRepository.update(document.id,document);
        }
        
        // kiểm tra xem đã là bộ phận cuối cùng xử lí chưa 
        if(document.proceduralStep.id == proceduralSteps[proceduralSteps.length -1].id){
            document.status = 3; // cập nhật trạng thái hoàn thành
            document.description = updateDocumentDto.description;
            return await this.documentRepository.update(document.id,document);
        }

        if(document.status != 2){
            document.status = 2;
        }
        // nếu chưa là bộ phận cuối cùng xử lí thì sẽ cập nhật tới bộ phận xử lí tiếp theo
        

        let nextDepartment = null;
        // console.log(document);
        let index = 0;
        for(index = 0; index < proceduralSteps.length; index++){
            // console.log(document.proceduralStep.step);
            // console.log(proceduralSteps[index].step);
            
            if(document.proceduralStep.step == proceduralSteps[index].step){
                document.proceduralStep = proceduralSteps[index+1];
                // document.proceduralStep.step = proceduralSteps[index+1].step;
                nextDepartment = proceduralSteps[index+1].department;
                break;
            }
        }
        // let nextDepartment = proceduralSteps[index+1].department;
        // console.log('===============================');
        
        // console.log(document);
        // console.log(nextDepartment);

        document.address = nextDepartment.address;

        // console.log('===============================end');
        // console.log(document);
        

        
        // const department = await this.departmentRepository.findOne({


        // })

        

        return await this.documentRepository.update(document.id,document);
        
    }

    async updateStatus(status: number, document_id: number): Promise<any>{
        let document = await this.documentRepository.findOne({
            where: {
                id: document_id
            }
        })

        document.status = status;
        return await this.documentRepository.update(document.id, document);
    }


    async getDocumentById(id: number): Promise<any>{
        let data:any =  await this.documentRepository.findOne({
            where:{
                id: id
            },
            relations: ['department', 'service','proceduralStep','attributeValues.attributeFormService' ]
            // {
            //     department: true,
            //     service: true,
            //     proceduralStep: true,
            //     attributeValues: true
            // }
        })

        console.log(data?.attributeValues.length);
        

        

        for (let index = 0; index < data?.attributeValues.length; index++) {
            if(data?.attributeValues[index].attributeFormService.type == 'Checkbox' || data?.attributeValues[index].attributeFormService.type == 'Select'){
                data.attributeValues[index].enum = await this.attributeFormEnumRepository.findOne({
                    where: {
                        id: Number(data?.attributeValues[index].value)
                    }
                })
            }
            
          }

        return data;
      }

      async getDocumentById2(id: number): Promise<Document>{
        let data:Document =  await this.documentRepository.findOne({
            where:{
                id: id
            },
            relations: ['department', 'service','proceduralStep','attributeValues.attributeFormService' ]
            // {
            //     department: true,
            //     service: true,
            //     proceduralStep: true,
            //     attributeValues: true
            // }
        })

        console.log(data?.attributeValues.length);

        return data;
      }


      async getAll(department_id: number,isAdmin: boolean): Promise<any[]> {
        console.log(department_id);
        console.log(isAdmin);
        
        let documents: any;
        if(isAdmin){
            documents = await this.documentRepository.find({
                relations: {
                    department: true,
                    service: true,
                    proceduralStep: {
                        department: true
                    },
                    documentActivityTraces: {
                        officer: true,
                        proceduralStep: {
                            department: true
                        }
                    }
                }
            });
        }else{
            documents = await this.documentRepository.find({
                where:[
                    {
                        department:{
                            id: department_id,
                        },
    
                    },
                    {
                        proceduralStep:{
                            department:{
                                id: department_id
                            }
                        }
                    }
                ],
                relations: {
                    department: true,
                    service: true,
                    proceduralStep: {
                        department: true
                    },
                    documentActivityTraces: {
                        officer: true,
                        proceduralStep: {
                            department: true
                        }
                    }
                }
            });
        }
            
    
        if (documents.length > 0) {
            let data = await Promise.all(documents.map(async (doc) => {
                let user = await this.userRepository.findOne({
                    where:{
                        id: Number(doc.user_id)
                    }
                });

                const proceduralSteps = await this.proceduralStepRepository.find({
                    where:{
                        service:{
                            id: Number(doc.service.id)
                        }
                    },
                    relations:{
                        department: true
                    }
                })
                // console.log(proceduralSteps);
                proceduralSteps.sort((a, b) => a.step - b.step);
        
                console.log(proceduralSteps);
                let is_last_step = false;
                // kiểm tra xem đã là bộ phận cuối cùng xử lí chưa 
                if(doc.proceduralStep.id == proceduralSteps[proceduralSteps.length -1].id){
                    is_last_step = true; // cập nhật trạng thái hoàn thành
                    
                }
                return {
                    ...doc,
                    user: user,
                    is_last_step: is_last_step
                };
            }));


            
    
        
            
            return data;
        }
    
        return [];
    }
    

      
}
