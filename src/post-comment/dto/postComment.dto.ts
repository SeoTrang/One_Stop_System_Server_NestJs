import { ApiProperty } from "@nestjs/swagger";

export class PostCommentDto{

    @ApiProperty()
    parent_id:number;

    @ApiProperty()
    content:string;

    @ApiProperty()
    media_content:string;

    @ApiProperty()
    post_id:number;

}