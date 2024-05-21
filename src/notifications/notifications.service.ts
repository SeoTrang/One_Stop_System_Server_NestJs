import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NotificationType } from 'src/notification-type/entities/notificationType.entity';
import { Notifications } from './entities/notifications.entity';
import { NotificationReceiver } from 'src/notification-receiver/entities/notificationReceiver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationsDto } from './dto/createNotification.dto';
import { NotificationsRespone } from './dto/notificationsRespone.dto';
import { UserService } from 'src/user/user.service';
import { Service } from 'src/service/entities/service.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(NotificationType) private notificationTypeRepository: Repository<NotificationType>,
        @InjectRepository(Notifications) private notificationsRepository: Repository<Notifications>,
        @InjectRepository(NotificationReceiver) private notificationReceiverRepository: Repository<NotificationReceiver>,
    ){}

    async create(createNotificationsDto: CreateNotificationsDto): Promise<any>{
        try {
            let notifications = new Notifications();
            notifications.entity_type = createNotificationsDto.entity_type;
            notifications.entity_id = createNotificationsDto.entity_id;
            notifications.actor_identifier = createNotificationsDto.actor_identifier;
            notifications.is_for_all = createNotificationsDto.is_for_all;
            notifications.notification_type = await this.notificationTypeRepository.findOne({
                where: {
                    id: createNotificationsDto.notification_type
                }
            })

            let notification_save = await this.notificationsRepository.save(notifications);
            if(!notification_save) throw new Error('error saving notification');
            // Sử dụng Promise.all để xử lý tất cả các promise cùng một lúc
            const notificationReceiverPromises = createNotificationsDto.notification_receivers.map(receiverDto => {
                let notificationReceiver = new NotificationReceiver();
                notificationReceiver.notification = notification_save;
                notificationReceiver.receiver_identifier = receiverDto.receiver_identifier;
                notificationReceiver.type_user = receiverDto.type_user;
                return this.notificationReceiverRepository.save(notificationReceiver);
            });

            await Promise.all(notificationReceiverPromises);

            return true;

        } catch (error) {
            console.log(error);
            throw new error;
            
        }
    }


    async getNotificationsFromuser(user_identifier: any, type_user: any) : Promise<any>{
        try {
            let result = await this.notificationsRepository.find({
                where: [
                    {
                        is_for_all: true
                    },
                    {
                        notification_receivers: {
                            receiver_identifier: user_identifier
                        }
                    }
                ],
                relations: {
                    notification_type: true,
                    notification_receivers: true
                },
                order: {
                    created_at: 'DESC'
                }
            })
            return result;
            
        } catch (error) {
            console.log(error);
            return new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
            
        }
    }
}
