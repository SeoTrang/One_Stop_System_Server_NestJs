import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FormNotificationType } from './dto/formNotificationType.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationType } from './entities/notificationType.entity';
import { Repository } from 'typeorm';
import { Notifications } from 'src/notifications/entities/notifications.entity';
import { NotificationReceiver } from 'src/notification-receiver/entities/notificationReceiver.entity';

@Injectable()
export class NotificationTypeService {

    constructor(
        @InjectRepository(NotificationType) private notificationTypeRepository: Repository<NotificationType>,
        @InjectRepository(Notifications) private notificationsRepository: Repository<Notifications>,
        @InjectRepository(NotificationReceiver) private notificationReceiverRepository: Repository<NotificationReceiver>,

    ){}
    async create(formNotificationType: FormNotificationType): Promise<any>{
        try {
            const notificationType = new NotificationType();
            notificationType.type = formNotificationType.type;
            const result = await this.notificationTypeRepository.save(notificationType);
            return result;

        } catch (error) {
            console.log(error);
            return new HttpException('Error creating notification', HttpStatus.BAD_GATEWAY)
            
        }
    }
}
