import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/user/entities/user.entity';
import { Officer } from 'src/officer/entities/officer.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Department) private departMentRepository: Repository<Department>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Officer) private officerRepository: Repository<Officer>,
    ){}

    async create(department_id:number, createPostDto: CreatePostDto): Promise<any>{
        const department = await this.departMentRepository.findOne({
            where:{
                id: department_id
            }
        })

        const res = await this.postRepository.save({
            ...createPostDto,
            department: department
        });

        const post = await this.postRepository.findOne({
            where:{
                id: res.id
            }
        });

        return post;
    }

    sortCommentsByHierarchy(comments:any, parentId = null) {
        // console.log(comments);
        
        const sortedComments = [];
        comments.forEach(comment => {
          if (comment.parent_id === parentId) {
            const children = this.sortCommentsByHierarchy(comments, comment.id);
            if (children.length > 0) {
              comment.children = children;
            }
            sortedComments.push(comment);
          }
        });
        return sortedComments;
    }

    async findAll(): Promise<any>{
        let data = await this.postRepository.find({
            relations:{
                reactions: true,
                comments: true,
                contents: true
            }
        });

        for (let index = 0; index < data.length; index++) {
            if(data[index].type_user == "student"){
                data[index].user = await this.userRepository.findOne({
                    where: {
                        id: Number(data[index].user_id)
                    }
                })
            }else {
                data[index].officer = await this.officerRepository.findOne({
                    where: {
                        id: Number(data[index].user_id)
                    }
                })
            }

            if(data[index].comments.length > 0){
                for (let j = 0; j < data[index].comments.length; j++) {
                    if(data[index].comments[j].type_user == "student"){
                        data[index].comments[j].user = await this.userRepository.findOne({
                            where: {
                                id: Number(data[index].user_id)
                            }
                        })
                    }else {
                        data[index].comments[j].officer = await this.officerRepository.findOne({
                            where: {
                                id: Number(data[index].user_id)
                            }
                        })
                    }
                    
                }
            }
            
            // reactions

            
        }
        for (let index = 0; index < data.length; index++) {
            const comments = data[index].comments;
            console.log(comments);
            
            const sortedComments = this.sortCommentsByHierarchy(comments);

            data[index].comments = sortedComments;
            

            
            
        }
        
        return data;
    }
}
