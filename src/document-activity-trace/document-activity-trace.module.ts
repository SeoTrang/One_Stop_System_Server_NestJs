import { Module } from '@nestjs/common';
import { DocumentActivityTraceController } from './document-activity-trace.controller';
import { DocumentActivityTraceService } from './document-activity-trace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentActivityTrace } from './entities/documentActivityTrace.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { Document } from 'src/document/entities/document.entity';
import { ProceduralStep } from 'src/procedural-step/entities/proceduralStep.entity';
import { DocumentService } from 'src/document/document.service';
import { Department } from 'src/department/entities/department.entity';
import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import { AttributeFormEnum } from 'src/attribute-form-enum/entities/attributeFormEnum.entity';
import { UserService } from 'src/user/user.service';
import { Faculties } from 'src/faculties/entities/faculties.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notification-type/entities/notificationType.entity';
import { Notifications } from 'src/notifications/entities/notifications.entity';
import { NotificationReceiver } from 'src/notification-receiver/entities/notificationReceiver.entity';
import { ProceduralStepService } from 'src/procedural-step/procedural-step.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentActivityTrace, Officer, Document, ProceduralStep, NotificationType, Notifications, NotificationReceiver, Department, Service, User, AttributeFormEnum, Faculties])
  ],
  controllers: [DocumentActivityTraceController],
  providers: [
    DocumentActivityTraceService,
    DocumentService,
    UserService,
    NotificationsService,
    ProceduralStepService
  ]
})
export class DocumentActivityTraceModule {}
