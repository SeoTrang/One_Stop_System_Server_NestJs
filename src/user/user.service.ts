import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { FormUserDto } from './dto/form-user.dto';
import { Faculties } from 'src/faculties/entities/faculties.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Officer } from 'src/officer/entities/officer.entity';
import { FormOfficerDto } from 'src/officer/dto/formOfficer.dto';
import { FormUpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Faculties) private facultiesRepository: Repository<Faculties>,
        @InjectRepository(Officer) private officerRepository: Repository<Officer>
        
    )
    {}

    async create(formUserDto: FormUserDto): Promise<any> {
        try {
            // Tìm kiếm thông tin về khoa dựa trên facultyId từ FormUserDto
            const faculty = await this.facultiesRepository.findOne({
                where: {
                    id: formUserDto.facultyId
                }
            });

            
            
            // Nếu không tìm thấy khoa, trả về lỗi 404
            if (!faculty) {
                throw new HttpException("No faculties found", HttpStatus.NOT_FOUND);
            }
    
            // Hash mật khẩu từ formUserDto.password
            const hashPassword = await bcrypt.hash(formUserDto.password, 10);
    
            // Tạo một đối tượng User từ FormUserDto và thông tin về khoa tìm thấy
            const createUserDto = new CreateUserDto(
                formUserDto.identifier,
                formUserDto.name,
                hashPassword, // Thay đổi thành hashPassword
                formUserDto.batch,
                formUserDto.in_class,
                formUserDto.address,
                formUserDto.gender,
                formUserDto.avatar ?? '/uploads/avatar_default.png',
                faculty,
                formUserDto.email,
                formUserDto.phone
            );
    
            // Tiến hành lưu thông tin người dùng vào cơ sở dữ liệu
            const createdUser = await this.userRepository.save(createUserDto);
    
            // Trả về thông tin về người dùng đã tạo
            return createdUser;
        } catch (error) {
            // Bắt và xử lý các lỗi nếu có
            throw new HttpException("Failed to create user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    async findAll(): Promise<any>{
        return this.userRepository.find({
            relations:{
                faculty: true
            }
        });
    }

    async getProfile(user_id: number): Promise<any> {
        return await this.userRepository.findOne({
            where: {
                id: user_id
            },
            relations:{
                faculty: true
            }
        })
    }


    async updateUser(user_id: number, user_data: any): Promise<UpdateResult> {

        const {faculty_id,...data} = user_data;
        let faculty: Faculties;
        if(user_data?.faculty_id){
            faculty = await this.facultiesRepository.findOne({
                where: {
                    id: Number(user_data.faculty_id)
                }
            });
        }

        const user:User = await this.userRepository.findOne({
            where:{
                id: Number(user_id)
            }
        })

        const userUpdateData:User = {
            ...user,
            ...data
        }

        if(user_data?.faculty_id){
            userUpdateData.faculty = faculty;
        }

        console.log(userUpdateData);
        

        return await this.userRepository.update(userUpdateData.id,userUpdateData);


        
        // return await this.userRepository.update(user_id, user_data);
        // if (user_data instanceof FormUpdateUserDto) {
        // } else {
        //     // Xử lý nếu user_data là một instance của FormOfficerDto
        //     // Ví dụ: throw error hoặc xử lý theo cách khác tùy thuộc vào logic của bạn
        // }
    }

    async getUserByIdentifier(identifier: string):Promise<any>{
        console.log(identifier);
        
        try {
            let user: any;
            user = await this.userRepository.findOne({
                where: {
                    identifier: identifier
                }
            });
    
            if (user) {
                console.log(user);
                
                return user;
            }
            
            user = await this.officerRepository.findOne({
                where: {
                    identifier: identifier
                }
            });
    
            console.log('user 2');
            console.log(user);
            
            
            return user || null; // Trả về null nếu không tìm thấy user
        } catch (error) {
            throw new Error(`Error in getUserByIdentifier: ${error.message}`);
        }
    }

    async getUserById(id: number):Promise<any>{
        console.log(id);
        
        try {
            let user: any;
            user = await this.userRepository.findOne({
                where: {
                    id: id
                },
                relations:{
                    faculty: true
                }
            });
    
            if (user) {
                console.log(user);
                
                return user;
            }
            
            user = await this.officerRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    department: true
                }
            });
    
            console.log('user 2');
            console.log(user);
            
            
            return user || null; // Trả về null nếu không tìm thấy user
        } catch (error) {
            throw new Error(`Error in getUserByIdentifier: ${error.message}`);
        }
    }
}
