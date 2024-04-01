import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { extname } from 'path';
import { storageConfig } from 'helper/config';
import { PostDto } from './dto/post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostMendiaContentDto } from 'src/post-media-content/dto/postMediaContent.dto';
import { PostMediaContentService } from 'src/post-media-content/post-media-content.service';
import { Post as PostUser } from './entities/post.entity';
import { PostCommentService } from 'src/post-comment/post-comment.service';
import { PostReactionService } from 'src/post-reaction/post-reaction.service';

@ApiTags('Post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService,
        private postMediaContentService: PostMediaContentService,
        private postCommentService: PostCommentService,
        private postReactionService: PostReactionService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    
    async create(@Req() req:any,@Body() postDto: PostDto):Promise<any>{
        console.log("====body===");
        
        console.log(postDto);

        console.log("====user_data===");
        console.log(req['user_data']);

        console.log("====user===");
        console.log(req['user']);

        let createPostDto = new CreatePostDto();
        createPostDto.title = postDto.title;
        createPostDto.caption = postDto.caption;
        createPostDto.user_id = req['user_data'].id;
        createPostDto.type_user = req['user_data'].type;

        let postSave = await this.postService.create(Number(postDto.department_id),createPostDto);
        // console.log(postSave.id);
        

        let postMediaContentArr: PostMendiaContentDto[] = []; // Khởi tạo mảng mới

        postDto.content.forEach(content => {
            // Tạo một đối tượng PostMendiaContentDto mới từ mỗi phần tử trong mảng content
            let postMediaContent = new PostMendiaContentDto();
            postMediaContent.content = content.content;
            postMediaContent.type = content.type;
            postMediaContent.post = postSave; // Thêm trường post_id
            // Thêm đối tượng này vào mảng mới
            postMediaContentArr.push(postMediaContent);
        });


        // console.log(postMediaContentArr);
        await this.postMediaContentService.create(postMediaContentArr);

        // console.log(postMediaContentArr);
        

        return {}
        
        
    }

    @Get()
    async findAll(@Req() req:any):Promise<any>{
        console.log("====user_data===");
        console.log(req['user_data']);
        return await this.postService.findAll();
    }

    @Put(":id")
    @UsePipes(ValidationPipe)
    async update(@Req() req:any, @Param("id") id: string,@Body() postDto: PostDto):Promise<any>{
        console.log("====body===");
        
        console.log(postDto);

        console.log("====user_data===");
        console.log(req['user_data']);

        let createPostDto = new CreatePostDto();
        createPostDto.title = postDto.title;
        createPostDto.caption = postDto.caption;
        createPostDto.user_id = req['user_data'].id;
        createPostDto.type_user = req['user_data'].type;

        let postSave = await this.postService.update(Number(id),Number(postDto.department_id),createPostDto);
        // console.log(postSave.id);


        if(postDto.content && postDto.content.length >= 0){

            // nếu mảng có thay đổi thì xóa đi các nội dung cũ
            await this.postMediaContentService.findAndDeleteByPostId(Number(id));

            if(postDto.content.length == 0) return "update successfully";

            // thêm lại mảng 
            let postMediaContentArr: PostMendiaContentDto[] = []; // Khởi tạo mảng mới
            await Promise.all(postDto.content.map(async (content) => {
                let postMediaContent = new PostMendiaContentDto();
                postMediaContent.content = content.content;
                postMediaContent.type = content.type;
            
                const post: PostUser = await this.postService.findOnePostItem(Number(id));
                postMediaContent.post = post;
            
                postMediaContentArr.push(postMediaContent);
            }));
            
            await this.postMediaContentService.create(postMediaContentArr);
            return {}
        }

        return "update successfully !";
        
    }

    @Delete(":id")

    async delete(@Param('id') id:string):Promise<any>{
        // delete post media content
        await this.postMediaContentService.deleteAllByPostId(Number(id))
        // delete post comments
        await this.postCommentService.deleteAllByPostId(Number(id))
        // delete reaction
        await this.postReactionService.deleteAllReactionsByPostId(Number(id))
        // delete post
        await this.postService.delete(Number(id))

    }

    

}
