import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostMediaContent } from './entities/postMediaContent.entity';
import { DeleteResult, Repository } from 'typeorm';
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

    // async findByPostId():Promise<PostMediaContent[]>{

    // }

    async findAndDeleteByPostId(post_id: number): Promise<boolean> {
        // Tìm tất cả các bản ghi có post_id tương ứng
        const postMediaContents: PostMediaContent[] = await this.postMediaContentRepository.find({
            where: {
                post: {
                    id: post_id
                }
            }
        });
    
        // Kiểm tra xem có bản ghi nào được tìm thấy hay không
        if (postMediaContents.length > 0) {
            // Lặp qua mỗi bản ghi và xóa từng bản ghi một cách tuần tự
            for (const postMediaContent of postMediaContents) {
                await this.postMediaContentRepository.remove(postMediaContent);
            }
            return true; // Trả về true nếu xóa thành công
        } else {
            // Nếu không có bản ghi nào được tìm thấy, trả về false
            return false;
        }
    }

    async deleteAllByPostId(post_id: number): Promise<any> {
        try {
            const result = await this.postMediaContentRepository.delete({
                post: {
                    id: post_id
                }
            });
            return result;
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error("Error deleting reactions:", error);
            throw error;
        }
    }
    
    
    
}
