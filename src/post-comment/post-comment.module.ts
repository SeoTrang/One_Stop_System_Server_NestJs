import { Module } from '@nestjs/common';
import { PostCommentController } from './post-comment.controller';
import { PostCommentService } from './post-comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from './entities/postComment.entity';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([PostComment,Post])
  ],

  controllers: [PostCommentController],
  providers: [PostCommentService]
})
export class PostCommentModule {}
