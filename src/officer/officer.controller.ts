import { Body, Controller, Get, HttpException, Param, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OfficerService } from './officer.service';
import {  FormOfficerDto } from './dto/formOfficer.dto';
import { Request } from 'express';

@ApiTags('Officer')
@ApiBearerAuth()
@Controller('officer')
export class OfficerController {
    constructor(
        private officerService: OfficerService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() formOfficerDto: FormOfficerDto):Promise<any>{
        // console.log(formOfficerDto);
        return await this.officerService.create(formOfficerDto);
        
    }
    @Get('/profile')
    @ApiOperation({ summary: 'Get all officer' })
    async getProfile(@Req() req:any):Promise<any>{
        
        console.log(req['user_data']);
        const user_id = req['user_data'].id;
        return await this.officerService.getProfile(Number(user_id));
        
        
    }

    @Get(':id')
    async getById(@Param('id') id):Promise<any>{
        return await this.officerService.getById(id);
    }

    

    @Get()
    @ApiOperation({ summary: 'Get all officer' })
    async getAll():Promise<any>{
        return await this.officerService.getAll();
    }

    

    @Put('/rbac/:id')
    async set_RBAC(@Param('id') id: string, @Body() body: any): Promise<any>{
        return await this.officerService.set_RBAC(body, Number(id));
    }
}
