import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostMediaContent{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    type: string;

    @ManyToOne(() => Post, (post) => post.contents)
    post: Post;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}