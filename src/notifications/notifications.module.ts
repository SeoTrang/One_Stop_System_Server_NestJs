import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationType } from 'src/notification-type/entities/notificationType.entity';
import { Notifications } from './entities/notifications.entity';
import { NotificationReceiver } from 'src/notification-receiver/entities/notificationReceiver.entity';
import { Service } from 'src/service/entities/service.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { UserModule } from 'src/user/user.module';
import { Faculties } from 'src/faculties/entities/faculties.entity';
import { Department } from 'src/department/entities/department.entity';
import { Role } from 'src/role/entities/role.entity';
import { ServiceModule } from 'src/service/service.module';
import { DocumentService } from 'src/document/document.service';
import { Document } from 'src/document/entities/document.entity';
import { ProceduralStep } from 'src/procedural-step/entities/proceduralStep.entity';
import { AttributeFormEnum } from 'src/attribute-form-enum/entities/attributeFormEnum.entity';

@Module({
  imports: [
    UserModule,
    ServiceModule,
    TypeOrmModule.forFeature([NotificationType, Notifications, NotificationReceiver, Service, User,Faculties, Officer,Department,Role, Document, ProceduralStep,AttributeFormEnum]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, DocumentService]
})
export class NotificationsModule {}
