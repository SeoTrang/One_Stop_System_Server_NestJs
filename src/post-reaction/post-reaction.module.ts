import { Module } from '@nestjs/common';
import { PostReactionController } from './post-reaction.controller';
import { PostReactionService } from './post-reaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostReaction } from './entities/postReaction.entity';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PostReaction,Post])],
  controllers: [PostReactionController],
  providers: [PostReactionService]
})
export class PostReactionModule {}
