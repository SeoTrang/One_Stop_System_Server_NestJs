import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    )
    {}

    async create(createUserDto: CreateUserDto) : Promise<any>{
        const hashPassword = await bcrypt.hash(createUserDto.password,10);

        return await this.userRepository.save({...createUserDto, password: hashPassword});
    }

    async findAll(): Promise<any>{
        return this.userRepository.find();
    }
}
