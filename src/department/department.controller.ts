import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
