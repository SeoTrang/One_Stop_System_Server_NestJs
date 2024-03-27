import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculties } from './entities/faculties.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacultiesService {
    constructor(
        @InjectRepository(Faculties) private facultiesRepository: Repository<Faculties>
    ){ }
    async create(createFacultyDto: CreateFacultyDto):Promise<any> {
        return await this.facultiesRepository.save(createFacultyDto);
    }

    async getAll():Promise<Faculties[]>{
        return await this.facultiesRepository.find();
    }

    async getAllDetail():Promise<Faculties[]>{
        return await this.facultiesRepository.find({
            relations:{
                users: true
            }
        });
    }
}
