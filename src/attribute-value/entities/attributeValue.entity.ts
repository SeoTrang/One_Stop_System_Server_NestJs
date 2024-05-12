import { AttributeFormService } from "src/attribute-form-service/entities/attributeFormService.entity";
import { Document } from "src/document/entities/document.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AttributeValue{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: true})
    value: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=> Document,(document) => document.attributeValues)
    document: Document;

    @ManyToOne(()=> AttributeFormService,(attributeFormservice) => attributeFormservice.attributeValues)
    attributeFormService: AttributeFormService;
}

