import { Body, Controller, Get, Post, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import {FormUserDto } from './dto/form-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() formUserDto: FormUserDto) : Promise<any>{
        return await this.userService.create(formUserDto);
    }

    @Get('/all')
    @SetMetadata('roles',['officer'])
    async findAll():Promise<any>{
        return await this.userService.findAll();
    }
}
