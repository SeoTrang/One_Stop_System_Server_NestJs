import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostCommentService } from './post-comment.service';
import { PostCommentDto } from './dto/postComment.dto';

@ApiTags('PostComment')
@ApiBearerAuth()
@Controller('post-comment')
export class PostCommentController {
    constructor(
        private postCommentService: PostCommentService
    ){}

    @Post()
    async create(@Req() req:any,@Body() postCommentDto:PostCommentDto):Promise<any>{
        console.log( req['user_data']);
        let user_id = req['user_data'].id;
        let type_user = req['user_data'].type;

        return await this.postCommentService.create(Number(user_id), type_user,postCommentDto);

        
    }

    @Delete(':id')
    async delete(@Param('id') id:string):Promise<any>{
        return await this.postCommentService.delete(Number(id));
    }

}
