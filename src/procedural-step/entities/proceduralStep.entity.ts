import { Department } from "src/department/entities/department.entity";
import { DocumentActivityTrace } from "src/document-activity-trace/entities/documentActivityTrace.entity";
import { Document } from "src/document/entities/document.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProceduralStep{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    step: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Department,(department) => department.proceduralSteps)
    department: Department;

    @ManyToOne(() => Service,(service) => service.proceduralSteps)
    service: Service;

    @OneToMany(() => Document,(document) => document.proceduralStep)
    documents: Document[];

    @OneToMany(() => DocumentActivityTrace, (documentActivityTrace) => documentActivityTrace.proceduralStep)
    documentActivityTraces: DocumentActivityTrace[];

}