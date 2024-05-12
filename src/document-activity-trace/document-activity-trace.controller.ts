import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDocTraceDto } from './dto/create-doc-trace.dto';
import { DocumentActivityTraceService } from './document-activity-trace.service';

@Controller('document-activity-trace')
@ApiTags('document-activity-trace')
@ApiBearerAuth()
export class DocumentActivityTraceController {
    constructor(
        private documentActivityTraceService: DocumentActivityTraceService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createDocTraceDto: CreateDocTraceDto): Promise<any>{
        return await this.documentActivityTraceService.create(createDocTraceDto);
    }
}
