import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Department } from 'src/department/entities/department.entity';
import { NotificationType } from 'src/notification-type/entities/notificationType.entity';
import { Notifications } from 'src/notifications/entities/notifications.entity';
import { NotificationReceiver } from 'src/notification-receiver/entities/notificationReceiver.entity';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Service,Department,NotificationType, Notifications, NotificationReceiver])
  ],
  controllers: [ServiceController],
  providers: [ServiceService, NotificationsService],
  exports: [ServiceService]
})
export class ServiceModule {}
