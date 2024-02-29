import { Body, Controller, Get, Post, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) : Promise<any>{
        return await this.userService.create(createUserDto);
    }

    @Get('/all')
    @SetMetadata('roles',['officer'])
    async findAll():Promise<any>{
        return await this.userService.findAll();
    }
}
