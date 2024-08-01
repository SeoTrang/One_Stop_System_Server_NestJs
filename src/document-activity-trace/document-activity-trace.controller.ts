import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDocTraceDto } from './dto/create-doc-trace.dto';
import { DocumentActivityTraceService } from './document-activity-trace.service';
import { DocumentService } from 'src/document/document.service';
import { CreateNotificationReceiverDto, CreateNotificationsDto } from 'src/notifications/dto/createNotification.dto';
import { UserService } from 'src/user/user.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { ProceduralStepService } from 'src/procedural-step/procedural-step.service';

@Controller('document-activity-trace')
@ApiTags('document-activity-trace')
@ApiBearerAuth()
export class DocumentActivityTraceController {
    constructor(
        private documentActivityTraceService: DocumentActivityTraceService,
        private documentService: DocumentService,
        private userService: UserService,
        private notificationsService: NotificationsService,
        private proceduralStepService: ProceduralStepService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create( @Req() req: any,@Body() createDocTraceDto: CreateDocTraceDto): Promise<any>{
        const user_identifier = req['user_data'].identifier;
        let result = await this.documentActivityTraceService.create(createDocTraceDto);
        const document_temp = await this.documentService.getDocumentById(Number(createDocTraceDto.documentId));

        console.log('document_temp : ');
        console.log(document_temp);
        
        
        if(document_temp.status == 1 && createDocTraceDto.status == 'resolve'){
            // nếu là phòng ban đầu tiên xác nhận thì sẽ thông báo cho sinh viên
            console.log('voo');
            
            await this.documentService.updateStatus(2,createDocTraceDto.documentId);
        
        
        
        
        const document = await this.documentService.getDocumentById(Number(createDocTraceDto.documentId));
        console.log('voo 2222');
        console.log(document);
        
        

        // create notification
        let proceduralStep = await this.proceduralStepService.getById(createDocTraceDto.proceduralStepId);
        
        if(document.status == 2){
            console.log('voo 3333');
            
            let userReceivers = null;
        let createNotificationReceiverDto: CreateNotificationReceiverDto = new CreateNotificationReceiverDto();
       
            userReceivers = await this.userService.getUserById(Number(document.user_id));
            createNotificationReceiverDto.type_user = 'student';
        
        let createNotificationsDto = new CreateNotificationsDto();
        createNotificationsDto.actor_identifier = user_identifier;
        createNotificationsDto.entity_type = 'document';
        createNotificationsDto.entity_id = document.id;
        createNotificationsDto.is_for_all = false;
        createNotificationsDto.notification_type = 3


        
        createNotificationReceiverDto.receiver_identifier = userReceivers.identifier;
        createNotificationsDto.notification_receivers = [
            createNotificationReceiverDto
        ];
        
       
        this.notificationsService.create(createNotificationsDto)
        }

        
        }
        
        return result;
    }


    @Get('/get-by-document-id/:document_id')
    async getByDocumentId(@Param('document_id') id: string): Promise<any>{
        return await this.documentActivityTraceService.getByDocumentId(Number(id));
    }

}
