import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/post/entities/post.entity";

export class CreatePostCommentDto{
    user_id:number;

    @ApiProperty()
    parent_id:number;

    @ApiProperty()
    content:string;

    @ApiProperty()
    media_content:string;

    type_user:string;

    post:Post;
}