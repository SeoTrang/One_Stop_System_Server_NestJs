import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeValue } from './entities/attributeValue.entity';
import { Repository } from 'typeorm';
import { Document } from 'src/document/entities/document.entity';
import { AttributeFormService } from 'src/attribute-form-service/entities/attributeFormService.entity';
import { AttributeValueDto } from './dto/attributeValue.dto';

@Injectable()
export class AttributeValueService {
  constructor(
    @InjectRepository(AttributeValue)
    private attributeValueRepository: Repository<AttributeValue>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(AttributeFormService)
    private attributeFormServiceRepository: Repository<AttributeFormService>,
  ) {}

  async create(document_id: number, attribute: any): Promise<any> {
    // const savedMediaContents = await Promise.all(postMediaContents.map(async (mediaContent) => {
    //     return await this.postMediaContentRepository.save(mediaContent);
    // }));
    try {
      console.log(document_id);
      console.log(attribute);
      const document = await this.documentRepository.findOne({
        where: {
          id: document_id,
        },
      });

      // Lưu tất cả các promise trả về từ việc save vào một mảng
      const savePromises = [];
      for (const obj of attribute) {
        let attributeValueDto = new AttributeValueDto();
        attributeValueDto.document = document;
        const key = Object.keys(obj)[0];
        const attributeFormService =
          await this.attributeFormServiceRepository.findOne({
            where: {
              id: Number(key),
            },
          });
        attributeValueDto.attributeFormService = attributeFormService;

        if (Array.isArray(obj[key])) {

          for (let index = 0; index < obj[key].length; index++) {
            let attributeValueDto1 = new AttributeValueDto();
            attributeValueDto1.attributeFormService = attributeFormService;
            attributeValueDto1.document = document;
            attributeValueDto1.value = obj[key][index];
            savePromises.push(
              this.attributeValueRepository.save(attributeValueDto1),
            );
          }
        } else {
          attributeValueDto.value = obj[key] || null;
          savePromises.push(
            this.attributeValueRepository.save(attributeValueDto),
          );
        }
      }

      // Đợi tất cả các promise trong mảng savePromises hoàn thành
      await Promise.all(savePromises);

      return 'success';
    } catch (error) {
      console.log(error);
      // HttpException('can not save attribute',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
}
