import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleDto } from './dto/Role.dto';
import { Officer } from 'src/officer/entities/officer.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(Officer) private officerRepository: Repository<Officer>
    ){}

    async create(createRoleDto : CreateRoleDto): Promise<any>{
        return this.roleRepository.save(createRoleDto);
    }

    async getAll():Promise<any[]>{
        return await this.roleRepository.find();
    }

    async getAllByUser(id: number):Promise<any>{
       // 1. Tìm người dùng dựa trên id
    const officer = await this.officerRepository.findOne({
        where:{
            id: id
        },
        relations:{
            roles: true
        }
    });
    
    // 2. Nếu không tìm thấy người dùng, trả về null hoặc throw một lỗi
    if (!officer) {
        // Trường hợp không tìm thấy người dùng
        return null;
    }

    // 3. Trả về các vai trò của người dùng
    return officer.roles;
    }

    async getById(id: number): Promise<RoleDto>{
        
        return await this.roleRepository.findOne({
            where: {
                id: Number(id)
            }
        })
    }
}
