import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {  FormFormFile } from './dto/form-form-file.dto';
import { FormFileService } from './form-file.service';

@Controller('form-file')
@ApiTags('form-file')
@ApiBearerAuth()
export class FormFileController {
    constructor(
        private formFileService: FormFileService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() formFormFile: FormFormFile): Promise<any> {
        return await this.formFileService.create(formFormFile);
    }
}
