import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeFormService } from './entities/attributeFormService.entity';
import { Repository } from 'typeorm';
import { AttributeFormServiceDto } from './dto/attributeFormService.dto';
import { Service } from 'src/service/entities/service.entity';
import { CreateAttributeFormServiceDto } from './dto/createAttributeFormServiceDto.dto';

@Injectable()
export class AttributeFormServiceService {
    constructor(
        @InjectRepository(AttributeFormService) private attributeFormServiceRepository: Repository<AttributeFormService>,
        @InjectRepository(Service) private serviceRepository: Repository<Service>
    ){}

    async create(attributeFormServiceDto: AttributeFormServiceDto): Promise<any>{
        const service = await this.serviceRepository.findOne({
            where:{
                id: attributeFormServiceDto.service_id
            }
        })

        if(!service) throw new HttpException('service_id not found', HttpStatus.BAD_REQUEST);
        let createAttributeFormServiceDto = new CreateAttributeFormServiceDto();
        createAttributeFormServiceDto.service = service;
        createAttributeFormServiceDto.name = attributeFormServiceDto.name;
        createAttributeFormServiceDto.type = attributeFormServiceDto.type;

        return await this.attributeFormServiceRepository.save(createAttributeFormServiceDto);
    }

    async addAttributeByServiceId(id: number):Promise<AttributeFormService[]>{
        // console.log(id);
        
        const res = await this.attributeFormServiceRepository.find({
            where:{
                service:{
                    id: id
                }
            },
            relations:{
                attributeFormEnums: true
            }
        })

        // console.log(res);
        return res;
        
    }
}
