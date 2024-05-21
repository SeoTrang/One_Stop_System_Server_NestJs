import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Document } from './entities/document.entity';
import { Department } from 'src/department/entities/department.entity';
import { Service } from 'src/service/entities/service.entity';
import { ProceduralStep } from 'src/procedural-step/entities/proceduralStep.entity';
import { AttributeValue } from 'src/attribute-value/entities/attributeValue.entity';
import { AttributeValueService } from 'src/attribute-value/attribute-value.service';
import { AttributeFormService } from 'src/attribute-form-service/entities/attributeFormService.entity';
import { DocxServiceService } from 'src/core/service/docx-service.service';
import { AttributeFormEnum } from 'src/attribute-form-enum/entities/attributeFormEnum.entity';
import { OfficerService } from 'src/officer/officer.service';
import { Officer } from 'src/officer/entities/officer.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Notifications } from 'src/notifications/entities/notifications.entity';
import { NotificationType } from 'src/notification-type/entities/notificationType.entity';
import { NotificationReceiver } from 'src/notification-receiver/entities/notificationReceiver.entity';
import { UserService } from 'src/user/user.service';
import { Faculties } from 'src/faculties/entities/faculties.entity';
import { ServiceService } from 'src/service/service.service';
import { ProceduralStepService } from 'src/procedural-step/procedural-step.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Document,
      Department,
      Service,
      ProceduralStep,
      AttributeValue,
      AttributeFormService,
      AttributeFormEnum,
      Officer,
      Role,
      Notifications,
      NotificationType,
      NotificationReceiver,
      Faculties,
      Service
    ]),
  ],
  controllers: [DocumentController],
  providers: [
    DocumentService,
    AttributeValueService,
    DocxServiceService,
    OfficerService,
    RoleService,
    NotificationsService,
    UserService,
    ServiceService,
    ProceduralStepService
  ],
})
export class DocumentModule {}
