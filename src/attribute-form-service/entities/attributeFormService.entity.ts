
import { AttributeFormEnum } from "src/attribute-form-enum/entities/attributeFormEnum.entity";
import { AttributeValue } from "src/attribute-value/entities/attributeValue.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AttributeFormService{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    // @IsIn(['text', 'select', 'checkBox', 'email', 'phoneNumber'])
    type: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=> Service,(service) => service.attributeFormServices)
    service: Service;

    @OneToMany(()=> AttributeFormEnum,(attributeFormEnum)=> attributeFormEnum.attributeFormService)
    attributeFormEnums: AttributeFormEnum[];

    @OneToMany(()=> AttributeValue,(attributeValue) => attributeValue.attributeFormService)
    attributeValues: AttributeValue[];
}