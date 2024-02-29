import { Department } from "src/department/entities/department.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Officer{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    identifier: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({default: false})
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Department,(department)=> department.officers)
    department: Department;
    
    


}