import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FacultiesService } from './faculties.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { Faculties } from './entities/faculties.entity';

@Controller('faculties')
@ApiTags('Faculties')
@ApiBearerAuth()
export class FacultiesController {
    constructor(
        private facultiesService: FacultiesService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createFacultyDto: CreateFacultyDto): Promise<any> {
        return await this.facultiesService.create(createFacultyDto);
    }

    @Get('/all-detail')
    async getAllDetail():Promise<Faculties[]>{
        return await this.facultiesService.getAllDetail();
    }

    @Get()
    async getAll():Promise<Faculties[]>{    
        return await this.facultiesService.getAll();
    }
}
