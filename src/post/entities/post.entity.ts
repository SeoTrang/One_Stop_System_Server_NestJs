import { Department } from "src/department/entities/department.entity";
import { Officer } from "src/officer/entities/officer.entity";
import { PostComment } from "src/post-comment/entities/postComment.entity";
import { PostMediaContent } from "src/post-media-content/entities/postMediaContent.entity";
import { PostReaction } from "src/post-reaction/entities/postReaction.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    caption: string;

    @Column()
    user_id: number;

    @Column()
    type_user: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=> Department, (department)=> department.posts)
    department: Department;

    @OneToMany(() => PostMediaContent,(postMediaContent)=> postMediaContent.post)
    contents: PostMediaContent[]

    @OneToMany(() => PostComment,(postComment)=> postComment.post)
    comments: PostComment[]

    @OneToMany(()=> PostReaction,(postReaction)=> postReaction.post)
    reactions: PostReaction[]

    officer?: Officer;

    user?: User;
}