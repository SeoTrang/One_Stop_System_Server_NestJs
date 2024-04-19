import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { AttributeValueService } from 'src/attribute-value/attribute-value.service';
import { UpdateDocumentDto } from './dto/updateDocment.dto';
import { FormDocumentDto } from './dto/form-document.dto';

@ApiTags('Document')
@ApiBearerAuth()
@Controller('document')
export class DocumentController {
    constructor(
        private documentService: DocumentService,
        private attributeValueService: AttributeValueService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Req() req: any,@Body() body: FormDocumentDto):Promise<any>{

        // console.log(body);
        // console.log(req['user_data']);

        // for (const obj of body.attribute) {
        //     const key = Object.keys(obj)[0];
        //     console.log(key);
            
        // }
        const document = await this.documentService.create(Number(req['user_data'].id),req['user_data'].type,Number(body.service_id))
        if(!document) throw new HttpException('can not create document',HttpStatus.BAD_REQUEST)
        
        return await this.attributeValueService.create(Number(document.id),body.attribute);
        
        return true;
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto):Promise<any>{
        console.log(id);
        console.log(updateDocumentDto);
        await this.documentService.update(Number(id),updateDocumentDto);
        return true;
    }

}
