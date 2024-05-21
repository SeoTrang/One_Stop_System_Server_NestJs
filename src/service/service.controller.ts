import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
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
    async create(@Req() req: any,@Body() serviceDto: ServiceDto):Promise<any>{
        const user_identifier = req['user_data'].identifier;
        return await this.serviceService.create(serviceDto, String(user_identifier));
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
