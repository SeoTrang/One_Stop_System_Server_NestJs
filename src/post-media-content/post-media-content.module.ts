import { Module } from '@nestjs/common';
import { PostMediaContentController } from './post-media-content.controller';
import { PostMediaContentService } from './post-media-content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMediaContent } from './entities/postMediaContent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostMediaContent])
  ],
  controllers: [PostMediaContentController],
  providers: [PostMediaContentService]
})
export class PostMediaContentModule {}
