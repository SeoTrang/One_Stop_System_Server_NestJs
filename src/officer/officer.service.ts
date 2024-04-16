import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Officer } from './entities/officer.entity';
import { FormOfficerDto } from './dto/formOfficer.dto';
import { OfficerDto } from './dto/officer.dto';
import { Department } from 'src/department/entities/department.entity';
import { RoleDto } from 'src/role/dto/Role.dto';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { FormUserDto } from 'src/user/dto/form-user.dto';
import { FormUpdateUserDto } from 'src/user/dto/update-user.dto';
import {UpdateOfficerDto } from './dto/updateOfficer.dto';
import { FormUpdateOfficerDto } from './dto/FormUpdateOfficer.dto';

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
    //     let OfficerDto = new OfficerDto();
    //     let department = await this.departmentRepository.findOne({
    //         where:{
    //             id: Number(formOfficerDto.department_id)
    //         }
    //     })
    //     OfficerDto.department = department;
    //     OfficerDto.password = hashPass;
    //     OfficerDto.email = formOfficerDto.email;
    //     OfficerDto.name = formOfficerDto.name;
    //     OfficerDto.identifier = formOfficerDto.identifier;
    //     OfficerDto.address = formOfficerDto.address;
    //     OfficerDto.avatar = formOfficerDto.avatar || null;
    //     OfficerDto.gender = formOfficerDto.gender;
        
    //     return await this.officerRepository.save(OfficerDto);
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

        const OfficerDto: OfficerDto = {
            identifier: formOfficerDto.identifier,
            name: formOfficerDto.name,
            password: hashPass,
            email: formOfficerDto.email,
            department: department, // Gán đối tượng phòng ban đã tìm thấy
            address: formOfficerDto.address,
            gender: formOfficerDto.gender,
            avatar: formOfficerDto.avatar || null,
            phone: formOfficerDto.phone
        };
        
    
        // const officer: Officer = {
        //     identifier: OfficerDto.identifier,
        //     name: OfficerDto.name,
        //     password: OfficerDto.password,
        //     email: OfficerDto.email,
        //     department: OfficerDto.department,
        //     address: OfficerDto.address,
        //     gender: OfficerDto.gender,
        //     avatar: OfficerDto.avatar,
        // };
        
        return await this.officerRepository.save(OfficerDto);
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
        let user_save = new OfficerDto();
        let user = await this.officerRepository.findOne({
            where:{
                id: user_id
            }
        })

        console.log(user);
        
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

        user_save = {
            ...user,
            roles: roles
        }

        
        
        return await this.officerRepository.save(user_save);
        
        

    }

    async updateProfile(user_id: number, user_data: FormUpdateOfficerDto): Promise<any> {
        console.log(user_data);
        const {department_id, ...data} = user_data;
        let department: Department;
        if(user_data?.department_id){
            department = await this.departmentRepository.findOne({
                where:{
                    id: Number(user_data?.department_id)
                }
            })
        }
        console.log(department);
        console.log(data);
        
        let officer:Officer = await this.officerRepository.findOne({
            where:{
                id: Number(user_id)
            }
        })

        if(!user_data) return '';
        // Sử dụng spread operator hoặc Object.assign để gán các giá trị từ user_data vào officer
        const updatedOfficer:Officer = {
            ...officer, // Giữ nguyên các giá trị hiện có của officer
            ...data // Ghi đè các giá trị từ user_data nếu chúng tồn tại
        };

        if(department){
            updatedOfficer.department = department;
        }
        console.log(updatedOfficer);
        
        
        return await this.officerRepository.update(updatedOfficer.id,updatedOfficer);
        return ''
        
        // return await this.officerRepository.update(user_id, user_data);
        if (user_data instanceof FormUpdateOfficerDto) {
            console.log(user_id);
            console.log(user_data);
            const department = await this.departmentRepository.find({
                where:{
                    id: Number(user_data.department_id)
                }
            })
            console.log(department);
            
            
            // return await this.officerRepository.update(user_id, user_data);
        } else {
            console.log('k vao');
            console.log(user_id);
            console.log(user_data);
            
            // Xử lý nếu user_data là một instance của FormUserDto
            // Ví dụ: throw error hoặc xử lý theo cách khác tùy thuộc vào logic của bạn
        }
    }
}
