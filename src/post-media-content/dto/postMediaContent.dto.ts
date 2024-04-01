import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/post/entities/post.entity";

export class PostMendiaContentDto{

    @ApiProperty()
    content: string;

    @ApiProperty()
    type: string;

    post?:Post;
}