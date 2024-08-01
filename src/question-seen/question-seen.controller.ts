import { Controller, Param, Post, Req } from '@nestjs/common';
import { QuestionSeenService } from './question-seen.service';

@Controller('Question-seen')
export class QuestionSeenController {
    constructor(
        private questionSeenService: QuestionSeenService
    ){}

    @Post(':id')
    async create(@Param('id') id: string, @Req() req: any): Promise<any>{
        const user_id = req['user_id'].id;
        const type_user = req['user_type'].type;
        return await this.questionSeenService.create(Number(id), Number(user_id), type_user);
    }
}
