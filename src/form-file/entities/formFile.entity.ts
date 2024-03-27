import { Department } from "src/department/entities/department.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FormFile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @ManyToOne(() => Service, (service) => service.formFiles)
    service: Service;

    @ManyToOne(() => Department, (department) => department.formFiles)
    department: Department;
}