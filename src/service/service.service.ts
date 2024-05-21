import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ServiceDto } from './dto/service.dto';
import { Department } from 'src/department/entities/department.entity';
import { CreateServiceDto } from './dto/createService.dto';
import { NotificationType } from 'src/notification-type/entities/notificationType.entity';
import { Notifications } from 'src/notifications/entities/notifications.entity';
import { NotificationReceiver } from 'src/notification-receiver/entities/notificationReceiver.entity';
import { CreateNotificationsDto } from 'src/notifications/dto/createNotification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Service) private serviceRepository: Repository<Service>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(NotificationType) private notificationTypeRepository: Repository<NotificationType>,
        @InjectRepository(Notifications) private notificationsRepository: Repository<Notifications>,
        @InjectRepository(NotificationReceiver) private notificationReceiverRepository: Repository<NotificationReceiver>,
        private notificationsService: NotificationsService
    ){}

    async create(serviceDto: ServiceDto, user_identifier: string):Promise<any>{
        try {
            const department = await this.departmentRepository.findOne({
                where:{
                    id: serviceDto.department_id
                }
            })
    
            if(!department) throw new HttpException('department_id not found',HttpStatus.BAD_REQUEST);
            let createServiceDto = new CreateServiceDto();
            createServiceDto.department = department;
            createServiceDto.name = serviceDto.name;
            createServiceDto.time_handle = serviceDto.time_handle;
            createServiceDto.type = serviceDto.type;
            createServiceDto.description = serviceDto.description;
    
    
            let result = await this.serviceRepository.save(createServiceDto);
            let createNotificationsDto = new CreateNotificationsDto();
            createNotificationsDto.actor_identifier = user_identifier;
            createNotificationsDto.entity_type = 'service';
            createNotificationsDto.entity_id = result.id;
            createNotificationsDto.is_for_all = true;
            createNotificationsDto.notification_type = 1
            createNotificationsDto.notification_receivers = [];
            this.notificationsService.create(createNotificationsDto)

            return result;
        } catch (error) {
            console.log(error);
            return new HttpException('can not create service : '+error.message, HttpStatus.BAD_GATEWAY)
            
        }
        

    }

    async getAllDetail(): Promise<Service[]>{
        return await this.serviceRepository.find({
            relations: ['attributeFormServices', 'attributeFormServices.attributeFormEnums', 'proceduralSteps', 'formFiles', 'department']
        });
    }

    async getAll(): Promise<Service[]>{
        return await this.serviceRepository.find({
            relations: ['attributeFormServices', 'attributeFormServices.attributeFormEnums', 'proceduralSteps', 'formFiles', 'department']
        });
    }

    async getById(id: number): Promise<Service>{
        return await this.serviceRepository.findOne({
            where:{
                id: id
            },
            relations:{
                attributeFormServices: {
                    attributeFormEnums: true
                }
            }
        })
    }

    async getById2(id: number): Promise<Service>{
        return await this.serviceRepository.findOne({
            where:{
                id: id
            }
        })
    }
}
