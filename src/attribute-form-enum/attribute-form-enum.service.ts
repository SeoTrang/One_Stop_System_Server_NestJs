import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeFormEnum } from './entities/attributeFormEnum.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAttributeFormEnumDto } from './dto/createAttributeFormEnum.dto';
import { AttributeFormService } from 'src/attribute-form-service/entities/attributeFormService.entity';

@Injectable()
export class AttributeFormEnumService {
    constructor(
        @InjectRepository(AttributeFormEnum) private attributeFormEnumRepository: Repository<AttributeFormEnum>,
        @InjectRepository(AttributeFormService) private attributeFormServiceRepository: Repository<AttributeFormService>
    
    ){}

    async create(attributeFormService_id:number,createAttributeFormEnumDto: CreateAttributeFormEnumDto):Promise<any>{
        const attributeFormService = await this.attributeFormServiceRepository.findOne({
            where:{
                id: attributeFormService_id
            }
        })

        if(!attributeFormService) throw new HttpException('attributeFormService_id not found', HttpStatus.BAD_REQUEST);
        return await this.attributeFormEnumRepository.save({
            ...createAttributeFormEnumDto,
            attributeFormService: attributeFormService
        })
    }

    async delete(id: number) : Promise<DeleteResult>{
        return await this.attributeFormEnumRepository.delete(id);
    }
}
