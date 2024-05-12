import { Document } from "src/document/entities/document.entity";
import { StatusDocumentActivityTrace } from "src/enum/enum";
import { Officer } from "src/officer/entities/officer.entity";
import { ProceduralStep } from "src/procedural-step/entities/proceduralStep.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DocumentActivityTrace{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'enum', enum: StatusDocumentActivityTrace})
    status: StatusDocumentActivityTrace;

    @ManyToOne(()=> Officer, (officer) => officer.documentActivityTraces)
    officer: Officer;

    @ManyToOne(() => Document, (document) => document.documentActivityTraces)
    document: Document;

    @ManyToOne(() => ProceduralStep, (proceduralStep) => proceduralStep.documentActivityTraces)
    proceduralStep: ProceduralStep;
    
}

