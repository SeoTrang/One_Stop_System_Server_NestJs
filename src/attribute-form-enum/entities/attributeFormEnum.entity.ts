import { AttributeFormService } from "src/attribute-form-service/entities/attributeFormService.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AttributeFormEnum{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => AttributeFormService, (attributeFormService) => attributeFormService.attributeFormEnums)
    attributeFormService: AttributeFormService;
}