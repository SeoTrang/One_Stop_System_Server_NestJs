import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostMediaContent } from './entities/postMediaContent.entity';
import { Repository } from 'typeorm';
import { PostMendiaContentDto } from './dto/postMediaContent.dto';

@Injectable()
export class PostMediaContentService {
    constructor(
        @InjectRepository(PostMediaContent) private postMediaContentRepository:Repository<PostMediaContent>
    ){}

    async create(postMediaContents: PostMendiaContentDto[]): Promise<any> {
        console.log(postMediaContents);
        
        // Sử dụng Promise.all để lưu tất cả các đối tượng PostMediaContent cùng một lúc và trả về một mảng kết quả
        const savedMediaContents = await Promise.all(postMediaContents.map(async (mediaContent) => {
            return await this.postMediaContentRepository.save(mediaContent);
        }));
    
        // Trả về mảng các đối tượng PostMediaContent đã được lưu
        return savedMediaContents;
    }
}
