import { Module } from '@nestjs/common';
import { NotificationTypeController } from './notification-type.controller';
import { NotificationTypeService } from './notification-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationType } from './entities/notificationType.entity';
import { Notifications } from 'src/notifications/entities/notifications.entity';
import { NotificationReceiver } from 'src/notification-receiver/entities/notificationReceiver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationType, Notifications, NotificationReceiver])
  ],
  controllers: [NotificationTypeController],
  providers: [NotificationTypeService]
})
export class NotificationTypeModule {}
