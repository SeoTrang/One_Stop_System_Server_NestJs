import { Body, Controller, Delete, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AttributeFormEnumService } from './attribute-form-enum.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAttributeFormEnumDto } from './dto/createAttributeFormEnum.dto';

@ApiTags('AttributeFormEnum')
@ApiBearerAuth()
@Controller('attribute-form-enum')
export class AttributeFormEnumController {
    constructor(
        private attributeFormEnumService: AttributeFormEnumService
    ){}

    @Post(':attributeFormService_id')
    @UsePipes(ValidationPipe)
    async create(@Param('attributeFormService_id') attributeFormService_id:string, @Body() createAttributeFormEnumDto:CreateAttributeFormEnumDto ): Promise<any>{
        return await this.attributeFormEnumService.create(Number(attributeFormService_id), createAttributeFormEnumDto);
    }

    @Delete(':id')
    async delete(@Param('id') id:string): Promise<any>{
        return await this.attributeFormEnumService.delete(Number(id));
    }



}
