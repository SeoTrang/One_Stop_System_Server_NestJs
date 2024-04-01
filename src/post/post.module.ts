import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostMediaContentService } from 'src/post-media-content/post-media-content.service';
import { PostMediaContent } from 'src/post-media-content/entities/postMediaContent.entity';
import { Department } from 'src/department/entities/department.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { User } from 'src/user/entities/user.entity';
import { PostCommentService } from 'src/post-comment/post-comment.service';
import { PostReactionService } from 'src/post-reaction/post-reaction.service';
import { PostComment } from 'src/post-comment/entities/postComment.entity';
import { PostReaction } from 'src/post-reaction/entities/postReaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post,PostMediaContent,Department,Officer,User,PostComment,PostReaction])
  ],
  controllers: [PostController],
  providers: [PostService,PostMediaContentService,PostCommentService,PostReactionService]
})
export class PostModule {}
