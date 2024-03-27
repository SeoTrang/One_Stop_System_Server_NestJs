import { Document } from "src/document/entities/document.entity";
import { FormFile } from "src/form-file/entities/formFile.entity";
import { Officer } from "src/officer/entities/officer.entity";
import { Post } from "src/post/entities/post.entity";
import { ProceduralStep } from "src/procedural-step/entities/proceduralStep.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Department{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    address: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(()=> Post,(post)=> post.department)
    posts: Post[];

    @OneToMany(()=> Service,(service)=> service.department)
    services: Service[];

    @OneToMany(()=> ProceduralStep,(proceduralStep) => proceduralStep.department)
    proceduralSteps: ProceduralStep[];

    @OneToMany(() => Document,(document) => document.department)
    documents: Document[];

    @OneToMany(() => Officer,(officer) => officer.department)
    officers: Officer[];

    @OneToMany(() => FormFile,(formFile) => formFile.department)
    formFiles: FormFile[];
}