import { AttributeFormService } from "src/attribute-form-service/entities/attributeFormService.entity";
import { Department } from "src/department/entities/department.entity";
import { Document } from "src/document/entities/document.entity";
import { ProceduralStep } from "src/procedural-step/entities/proceduralStep.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    time_handle:number;

    @Column({ type: 'text', nullable: true }) // Đặt kiểu dữ liệu là 'text'
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Department, (department)=> department.services)
    department: Department;

    @OneToMany(() => AttributeFormService,(attributeFormService)=> attributeFormService.service)
    attributeFormServices: AttributeFormService[];

    @OneToMany(() => ProceduralStep,(proceduralStep) => proceduralStep.service)
    proceduralSteps: ProceduralStep[];

    @OneToMany(() => Document,(document) => document.service)
    documents: Document[];
}