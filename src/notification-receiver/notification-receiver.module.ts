import { Module } from '@nestjs/common';
import { NotificationReceiverController } from './notification-receiver.controller';
import { NotificationReceiverService } from './notification-receiver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationType } from 'src/notification-type/entities/notificationType.entity';
import { Notifications } from 'src/notifications/entities/notifications.entity';
import { NotificationReceiver } from './entities/notificationReceiver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationType, Notifications, NotificationReceiver])
  ],
  controllers: [NotificationReceiverController],
  providers: [NotificationReceiverService]
})
export class NotificationReceiverModule {}
