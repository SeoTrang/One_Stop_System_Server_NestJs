import { Post } from "src/post/entities/post.entity";

export class CreatePostReaction{
    user_id:number;
    type_user: string;
    post:Post;
}