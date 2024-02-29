import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeValue } from './entities/attributeValue.entity';
import { Repository } from 'typeorm';
import { Document } from 'src/document/entities/document.entity';
import { AttributeFormService } from 'src/attribute-form-service/entities/attributeFormService.entity';
import { AttributeValueDto } from './dto/attributeValue.dto';

@Injectable()
export class AttributeValueService {
    constructor(
        @InjectRepository(AttributeValue) private attributeValueRepository: Repository<AttributeValue>,
        @InjectRepository(Document) private documentRepository: Repository<Document>,
        @InjectRepository(AttributeFormService) private attributeFormServiceRepository: Repository<AttributeFormService>,

    ){}

    async create(document_id: number, attribute: any): Promise<any>{
        // const savedMediaContents = await Promise.all(postMediaContents.map(async (mediaContent) => {
        //     return await this.postMediaContentRepository.save(mediaContent);
        // }));
        console.log(document_id);
        console.log(attribute);
        const document = await this.documentRepository.findOne({
            where:{
                id: document_id
            }
        })


        for (const obj of attribute) {
            let attributeValueDto = new AttributeValueDto();
            attributeValueDto.document = document;
            const key = Object.keys(obj)[0];
            console.log(key);
            const attributeFormService = await this.attributeFormServiceRepository.findOne({
                where:{
                    id: Number(key)
                }
            })

            attributeValueDto.attributeFormService = attributeFormService;
            return await this.attributeValueRepository.save(attributeValueDto);
        }
        

    }
}
