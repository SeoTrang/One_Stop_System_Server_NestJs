import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { extname } from 'path';
import { storageConfig } from 'helper/config';
import { PostDto } from './dto/post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostMendiaContentDto } from 'src/post-media-content/dto/postMediaContent.dto';
import { PostMediaContentService } from 'src/post-media-content/post-media-content.service';

@ApiTags('Post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService,
        private postMediaContentService: PostMediaContentService
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
}
