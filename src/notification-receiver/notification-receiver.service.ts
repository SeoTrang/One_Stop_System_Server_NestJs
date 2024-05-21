import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationReceiver } from './entities/notificationReceiver.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NotificationReceiverService {
    constructor(
        @InjectRepository(NotificationReceiver) private notificationReceiverRepository: Repository<NotificationReceiver>
    ){}
    
    async updateIsRead(id: number): Promise<UpdateResult>{
        let notification = await this.notificationReceiverRepository.findOne({
            where: {
                id: id
            }
        })

        notification.is_read = true;

        return this.notificationReceiverRepository.update(notification.id, notification);
    }
}
