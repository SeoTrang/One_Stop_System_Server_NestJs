

import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostComment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true, default: null})
    parent_id:number;

    @Column({nullable:true, default: null})
    content: string;

    @Column({nullable:true, default: null})
    media_content:string;

    @Column()
    user_id:number;

    @Column()
    type_user:string;

    @ManyToOne(()=> Post,(post) => post.comments)
    post:Post;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
}