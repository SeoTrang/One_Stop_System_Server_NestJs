import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Officer } from 'src/officer/entities/officer.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
  
  @Column({nullable: true})
  routerLink: string;

  @Column({nullable: true})
  icon: string;

  @Column({nullable: true})
  parent_id: number;

  @Column({nullable: false, default: false})
  nav_menu: boolean;


  @ManyToMany(() => Officer, (officer) => officer.roles, {
    cascade: false,
  })
  officers: Officer[];
}
