import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProceduralStepService } from './procedural-step.service';
import { ProceduralStepDto } from './dto/proceduralStep.dto';

@ApiTags('ProceduralStep')
@ApiBearerAuth()
@Controller('procedural-step')
export class ProceduralStepController {
    constructor(
        private proceduralStepService: ProceduralStepService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() proceduralStepDto : ProceduralStepDto):Promise<any>{
        return await this.proceduralStepService.create(proceduralStepDto);
    }
}
