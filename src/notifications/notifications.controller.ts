import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { UserService } from 'src/user/user.service';
import { NotificationsRespone } from './dto/notificationsRespone.dto';
import { ServiceService } from 'src/service/service.service';
import { DocumentService } from 'src/document/document.service';
@Controller('notifications')
@ApiTags('Notifications')
@ApiBearerAuth()
export class NotificationsController {
  constructor(
    private notificationsService: NotificationsService,
    private userService: UserService,
    private serviceService: ServiceService,
    private documentService: DocumentService
  ) {}

  @Get()
  async getNotificationsFromuser(@Req() req: any): Promise<any> {
    const user_identifier = req['user_data'].identifier;
    const type_user = req['user_data'].type;
    let result = await this.notificationsService.getNotificationsFromuser(
      user_identifier,
      type_user,
    );

    const notification = result.map(async (notification) => {
      let actor = await this.userService.getUserByIdentifier(notification.actor_identifier);
      let entity: any = null;
      let entity_reference = null;
      let department = null;
      
      switch (notification.entity_type) {
        case 'service':
          entity = await this.serviceService.getById2(notification.entity_id);
          let tempData1 = await this.serviceService.getById3(notification.entity_id);
          department = tempData1?.department;
          break;
        case 'document':
            let tempData = await this.documentService.getDocumentById(notification.entity_id);
            entity_reference = tempData?.service?.name;
            department = tempData?.department;
          break;
        default:
          break;
      }
      return {
        ...notification,
        actor: actor,
        entity: entity?.name,
        entity_reference: entity_reference,
        department: department
      };
    });

    return Promise.all(notification);
  }
}
