import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from './dto/create-department.dto';

@ApiTags('Department')
@ApiBearerAuth()
@Controller('department')
export class DepartmentController {
    constructor(
        private departmentService: DepartmentService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createDepartmentDto: CreateDepartmentDto):Promise<any>{
        return await this.departmentService.create(createDepartmentDto);
    }

    @Get()
    async getAll():Promise<any>{
        return await this.departmentService.getAll();
    }

    @Get('/all-detail')
    async getAllDetail():Promise<any>{
        return await this.departmentService.getAllDetail();
    }

    @Delete(':id')
    async delete(@Param('id') id:string):Promise<any>{
        return await this.departmentService.delete(Number(id));
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() data: CreateDepartmentDto): Promise<any>{
        return await this.departmentService.update(Number(id),data);
    }
}
