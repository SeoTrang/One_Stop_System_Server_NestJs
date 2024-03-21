import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleDto } from './dto/Role.dto';

@ApiTags('Role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
    constructor(
        private roleService: RoleService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createRoleDto: CreateRoleDto): Promise<any>{
        return await this.roleService.create(createRoleDto);
    }

    @Get()
    async getAll():Promise<any[]>{
        return await this.roleService.getAll();
    }

    @Get('/user')
    async getAllByUser(@Req() req:any):Promise<any[]>{
        console.log("====user_data===");
        console.log(req['user_data']);
        const user_id = req['user_data'].id;
        return await this.roleService.getAllByUser(Number(user_id));

    }

    @Get(':id')
    async getOne(@Param('id') id: string):Promise<RoleDto>{
        return await this.roleService.getById(Number(id));
    }
}
