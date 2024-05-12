import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ServiceDto } from './dto/service.dto';
import { Service } from './entities/service.entity';

@ApiTags('Service')
@ApiBearerAuth()
@Controller('service')
export class ServiceController {
    constructor(
        private serviceService: ServiceService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() serviceDto: ServiceDto):Promise<any>{
        return await this.serviceService.create(serviceDto);
    }

    @Get('/all-detail')
    async getAllDetail():Promise<Service[]>{
        return await this.serviceService.getAllDetail();
    }

    @Get()
    async getAll():Promise<Service[]>{
        return await this.serviceService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string):Promise<Service>{
        return await this.serviceService.getById(Number(id));
    }
    
}
