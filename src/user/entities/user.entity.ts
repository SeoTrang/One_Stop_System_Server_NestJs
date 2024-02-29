import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    identifier: string;

    @Column()
    name: string;

    @Column()
    password: string;
    
    @Column()
    batch: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    

}