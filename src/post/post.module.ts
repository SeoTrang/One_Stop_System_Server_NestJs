import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostMediaContentService } from 'src/post-media-content/post-media-content.service';
import { PostMediaContent } from 'src/post-media-content/entities/postMediaContent.entity';
import { Department } from 'src/department/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post,PostMediaContent,Department])
  ],
  controllers: [PostController],
  providers: [PostService,PostMediaContentService]
})
export class PostModule {}
