import { Faculties } from "src/faculties/entities/faculties.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
  }

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

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    in_class: string;

    @Column({ type: 'text'})
    address: string;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;

    @Column({nullable: true})
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Faculties, (faculties) => faculties.users)
    faculty: Faculties;
}