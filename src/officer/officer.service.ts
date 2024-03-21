import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Officer } from './entities/officer.entity';
import { FormOfficerDto } from './dto/formOfficer.dto';
import { CreateOfficerDto } from './dto/officer.dto';
import { Department } from 'src/department/entities/department.entity';
import { RoleDto } from 'src/role/dto/Role.dto';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class OfficerService {
    constructor(
        @InjectRepository(Officer) private officerRepository: Repository<Officer>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private roleService: RoleService
    ){}

    // async create(formOfficerDto: FormOfficerDto):Promise<any>{
    //     const hashPass = await bcrypt.hash(formOfficerDto.password,10)
    //     let createOfficerDto = new CreateOfficerDto();
    //     let department = await this.departmentRepository.findOne({
    //         where:{
    //             id: Number(formOfficerDto.department_id)
    //         }
    //     })
    //     createOfficerDto.department = department;
    //     createOfficerDto.password = hashPass;
    //     createOfficerDto.email = formOfficerDto.email;
    //     createOfficerDto.name = formOfficerDto.name;
    //     createOfficerDto.identifier = formOfficerDto.identifier;
    //     createOfficerDto.address = formOfficerDto.address;
    //     createOfficerDto.avatar = formOfficerDto.avatar || null;
    //     createOfficerDto.gender = formOfficerDto.gender;
        
    //     return await this.officerRepository.save(createOfficerDto);
    // }

    async create(formOfficerDto: FormOfficerDto): Promise<any> {
        const departmentId = Number(formOfficerDto.department_id); // Chuyển department_id thành số nguyên
        const department = await this.departmentRepository.findOne({
            where:{
                id: Number(departmentId)
            }
        }); // Tìm phòng ban bằng department_id
    
        if (!department) {
            throw new Error('Department not found');
        }
    
        const hashPass = await bcrypt.hash(formOfficerDto.password, 10);

        const createOfficerDto: CreateOfficerDto = {
            identifier: formOfficerDto.identifier,
            name: formOfficerDto.name,
            password: hashPass,
            email: formOfficerDto.email,
            department: department, // Gán đối tượng phòng ban đã tìm thấy
            address: formOfficerDto.address,
            gender: formOfficerDto.gender,
            avatar: formOfficerDto.avatar || null,
        };
        
    
        // const officer: Officer = {
        //     identifier: createOfficerDto.identifier,
        //     name: createOfficerDto.name,
        //     password: createOfficerDto.password,
        //     email: createOfficerDto.email,
        //     department: createOfficerDto.department,
        //     address: createOfficerDto.address,
        //     gender: createOfficerDto.gender,
        //     avatar: createOfficerDto.avatar,
        // };
        
        return await this.officerRepository.save(createOfficerDto);
    }
    

    async getById(id: number) : Promise<any>{
        return await this.officerRepository.findOne({
            where:{
                id: id
            },
            relations:{
                roles: true
            }
        })
    }

    async getProfile(id: number) : Promise<any>{
        return await this.officerRepository.findOne({
            where:{
                id: id
            },
            relations:{
                roles: true
            }
        })
    }

    async getAll() : Promise<any>{
        return await this.officerRepository.find({
            relations:{
                roles: true
            }
        })
    }

    // Role-Based Access Control
    async set_RBAC(role: any, user_id: number): Promise<any>{
        console.log(role);
        console.log(user_id);
        let user_save = new CreateOfficerDto();
        let user = await this.officerRepository.findOne({
            where:{
                id: user_id
            }
        })

        if (!user) {
            throw new HttpException('user not found',HttpStatus.NOT_FOUND);
        }
        // const roles = await role.roles.map(async(value: any) => {
        //     const role = await this.roleService.getById(Number(value))
        //     return {
        //         ...role
        //     }
        // })
        // Sử dụng Promise.all để chờ tất cả các promise hoàn thành
        const roles = await Promise.all(role.roles.map(async (value: any) => {
            const role = await this.roleService.getById(Number(value));
            return {
                ...role
            };
        }));
        
        await this.officerRepository.save(user_save);
        return user_save;
        

    }
}
