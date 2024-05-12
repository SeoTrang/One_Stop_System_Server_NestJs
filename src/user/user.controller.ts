import { Body, Controller, Get, Param, Post, Put, Req, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import {FormUserDto } from './dto/form-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OfficerService } from 'src/officer/officer.service';
@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private officerService: OfficerService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() formUserDto: FormUserDto) : Promise<any>{
        return await this.userService.create(formUserDto);
    }

    @Get('/all')
    // @SetMetadata('roles',['officer'])
    async findAll():Promise<any>{
        return await this.userService.findAll();
    }

    @Get('/profile')
    async profile(@Req() req:any):Promise<any> {
        const user_id = req['user_data'].id;
        return await this.userService.getProfile(Number(user_id));
    }

    @Put()
    async updateUser(@Req() req: any, @Body() userData: any): Promise<any> {
        const user_id = req['user_data'].id;
        const type_user = req['user_data'].type;
    
        console.log(req['user_data']);
        console.log(type_user);
        
        if (type_user === 'officer') {
            
            return await this.officerService.updateProfile(Number(user_id), userData);
        } else {
            return await this.userService.updateUser(Number(user_id), userData);
        }
    }

    @Get('/profile/:identifier')
    async getUserByUserId(@Param("identifier") identifier: string): Promise<any>{
        console.log(identifier);
        
        return await this.userService.getUserByIdentifier(identifier);
    }

    @Get(':id')
    async getUserById(@Param("id") id: string): Promise<any>{
        console.log(id);
        
        return await this.userService.getUserById(Number(id));
    }
}
