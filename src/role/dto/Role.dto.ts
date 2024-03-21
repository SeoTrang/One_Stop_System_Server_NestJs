
import { Officer } from 'src/officer/entities/officer.entity';

export class RoleDto {
  id: number;

  label: string;
  
  routerLink: string;

  icon: string;

  parent_id: number;

  officers?: Officer[];
}
