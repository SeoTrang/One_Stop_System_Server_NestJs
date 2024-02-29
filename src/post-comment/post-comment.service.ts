import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostComment } from './entities/postComment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { PostCommentDto } from './dto/postComment.dto';
import { Post } from 'src/post/entities/post.entity';
import { CreatePostCommentDto } from './dto/create-postComment.dto';

@Injectable()
export class PostCommentService {
    constructor(
        @InjectRepository(PostComment) private postCommentRepository: Repository<PostComment>,
        @InjectRepository(Post) private postRepository: Repository<Post>
        

    ){}

    async create(user_id:number,type_user:string,postCommentDto:PostCommentDto):Promise<any>{
        let createPostCommentDto = new CreatePostCommentDto();
        let post = await this.postRepository.findOne({
            where:{
                id: Number(postCommentDto.post_id)
            }
        })

        if(!post) throw new HttpException('post_id not found',HttpStatus.BAD_REQUEST)

        createPostCommentDto.post = post;
        createPostCommentDto.user_id = user_id;
        createPostCommentDto.type_user = type_user;
        createPostCommentDto.content = postCommentDto.content;
        createPostCommentDto.media_content = postCommentDto.media_content;
        createPostCommentDto.parent_id = postCommentDto.parent_id;

        const res = await this.postCommentRepository.save(createPostCommentDto);
        return {}
        
    }

    async delete(id:number):Promise<DeleteResult>{
        return await this.postCommentRepository.delete(id);
    }
}
