import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OfficerService } from './officer.service';
import {  FormOfficerDto } from './dto/formOfficer.dto';

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
}
