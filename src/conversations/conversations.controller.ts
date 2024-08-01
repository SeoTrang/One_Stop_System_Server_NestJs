import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConversationDto } from './dto/conversation.dto';

@Controller('conversations')
@ApiTags('Conversations')
@ApiBearerAuth()
export class ConversationsController {
    constructor(
        private conversationService: ConversationsService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() body: ConversationDto): Promise<any>{
        return await this.conversationService.create(body.user_id, body.department_id);
    }

    
    @Get('/get-all-by-department')
    async getAllByDepartment(@Req() req: any): Promise<any>{
        const department_id = req['user_data'].department_id;
        return await this.conversationService.getAllByDepartment(Number(department_id));
    }

    @Get('/get-all-by-user')
    async getAllByUser(@Req() req: any): Promise<any>{
        const user_id = req['user_data'].id;
        return await this.conversationService.getAllByUser(Number(user_id));
    }

    @Get('/get-detail-by-conversation/:conversation_id')
    async getDetailByConversation(@Param('conversation_id') id: string): Promise<any>{
        return await this.conversationService.getDetailConversation(Number(id));
    }
    
}
