import { Department } from "src/department/entities/department.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

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

    @Column()
    phone: string;

    @Column({default: false})
    isAdmin: boolean;

    @Column({ type: 'text'})
    address: string;

    @Column({ type: 'enum', enum: Gender})
    gender: Gender;

    @Column({nullable: true})
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Department,(department)=> department.officers)
    department: Department;
    
    @ManyToMany(() => Role,(role)=> role.officers,{
        cascade: false
    })
    @JoinTable()
    roles: Role[];

}