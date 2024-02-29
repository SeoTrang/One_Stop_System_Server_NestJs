import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttributeFormServiceDto } from './dto/attributeFormService.dto';
import { AttributeFormServiceService } from './attribute-form-service.service';
import { AttributeFormService } from './entities/attributeFormService.entity';

@ApiTags('AttributeFormService')
@ApiBearerAuth()
@Controller('attribute-form-service')
export class AttributeFormServiceController {
    constructor(
        private attributeFormServiceService: AttributeFormServiceService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() attributeFormServiceDto: AttributeFormServiceDto): Promise<any>{
        return await this.attributeFormServiceService.create(attributeFormServiceDto);
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'successfully'})
    async addAttributeByServiceId(@Param('id') id:string):Promise<AttributeFormService[]>{
        return await this.attributeFormServiceService.addAttributeByServiceId(Number(id));
    }

}
