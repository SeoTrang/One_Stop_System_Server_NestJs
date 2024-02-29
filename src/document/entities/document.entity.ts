import { AttributeValue } from "src/attribute-value/entities/attributeValue.entity";
import { Department } from "src/department/entities/department.entity";
import { ProceduralStep } from "src/procedural-step/entities/proceduralStep.entity";
import { Service } from "src/service/entities/service.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Document{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: number;

    @Column({nullable: true})
    description: string;

    @Column({ type: 'text', nullable: true }) 
    address: string;

    @Column() 
    type_user: string;

    @Column() 
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Department,(department) => department.documents)
    department: Department;

    @ManyToOne(() => Service,(service) => service.documents)
    service: Service;

    @ManyToOne(() => ProceduralStep,(proceduralStep) => proceduralStep.documents)
    proceduralStep: ProceduralStep;

    @OneToMany(() => AttributeValue,(attributeValue) => attributeValue.document)
    attributeValues: AttributeValue[];


}