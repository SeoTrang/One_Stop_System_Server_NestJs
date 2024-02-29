import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostReaction{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user_id:number;

    @Column()
    type_user:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=> Post, (post) => post.reactions)
    post:Post;
}