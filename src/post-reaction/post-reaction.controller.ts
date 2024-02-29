import { Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { PostReactionService } from './post-reaction.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('PostReaction')
@ApiBearerAuth()
@Controller('post-reaction')
export class PostReactionController {
    constructor(
        private postReactionService: PostReactionService
    ){}

    @Post(':id')
    async create(@Req() req,@Param('id') id:string): Promise<any>{
        let user_id = req['user_data'].id;
        let type_user = req['user_data'].type;
        return await this.postReactionService.create(Number(id),user_id,type_user);
    }

    @Delete(':id')
    async delete(@Param('id') id:string): Promise<any>{
        // let user_id = req['user_data'].id;
        // let type_user = req['user_data'].type;
        return await this.postReactionService.delete(Number(id));
    }
}
