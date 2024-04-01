import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { FormUserDto } from './dto/form-user.dto';
import { Faculties } from 'src/faculties/entities/faculties.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Faculties) private facultiesRepository: Repository<Faculties>
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
        return this.userRepository.find();
    }

    async getProfile(user_id: number): Promise<any> {
        return await this.userRepository.findOne({
            where: {
                id: user_id
            }
        })
    }
}
