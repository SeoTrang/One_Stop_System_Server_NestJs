import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PostMendiaContentDto } from "src/post-media-content/dto/postMediaContent.dto";

export class PostDto{
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    caption: string;

    @ApiProperty()
    @IsNotEmpty()
    department_id: number;

    user_id: number;
    type_user: string;

    @ApiProperty()
    content: PostMendiaContentDto[]
}