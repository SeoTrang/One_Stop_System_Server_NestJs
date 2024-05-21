import { Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationReceiverService } from './notification-receiver.service';
import { UpdateResult } from 'typeorm';

@Controller('notification-receiver')
@ApiTags('Notification-receiver')
@ApiBearerAuth()
export class NotificationReceiverController {
    constructor(
        private notificationreceiverService: NotificationReceiverService
    ){}

    @Put('/update-is-read/:id')
    async updateIsRead(@Param('id') id: string): Promise<UpdateResult>{
        return this.notificationreceiverService.updateIsRead(Number(id));
    }
}
