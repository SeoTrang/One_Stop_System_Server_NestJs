import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostReaction } from './entities/postReaction.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePostReaction } from './dto/createPostReaction.dto';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class PostReactionService {
    constructor(
        @InjectRepository(PostReaction) private postReactionRepository: Repository<PostReaction>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ){}

    async create(post_id:number,user_id:number,type_user:string):Promise<any>{
        const post = await this.postRepository.findOne({
            where:{
                id: post_id
            }
        })

        if(!post) throw new HttpException('post_id not found', HttpStatus.BAD_REQUEST);
        let checkExist = await this.postReactionRepository.findOne({
            where:{
                user_id: user_id,
                type_user: type_user,
                post:{
                    id: post.id
                }
            }
        })

        console.log(checkExist);
        // return {}
        

        if(checkExist) throw new HttpException('reaction is already exist', HttpStatus.CONFLICT)
        let createPostreaction = new CreatePostReaction();
        createPostreaction.post = post;
        createPostreaction.user_id = user_id;
        createPostreaction.type_user = type_user;

        return await this.postReactionRepository.save(createPostreaction);
    }

    async delete(id: number):Promise<DeleteResult>{
        return await this.postReactionRepository.delete(id);
    }
}
