import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ServiceDto } from './dto/service.dto';

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
    
}
