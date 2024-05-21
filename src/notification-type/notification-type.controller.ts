import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationTypeService } from './notification-type.service';
import { FormNotificationType } from './dto/formNotificationType.dto';

@Controller('notification-type')
@ApiTags('Notification-type')
@ApiBearerAuth()
export class NotificationTypeController {
    constructor(
        private notificationTypeService: NotificationTypeService
    ) {}


    @Post()
    @UsePipes(ValidationPipe)
    async Create(@Body() formNotificationType: FormNotificationType) : Promise<any> {
        return await this.notificationTypeService.create(formNotificationType);
    }
}
