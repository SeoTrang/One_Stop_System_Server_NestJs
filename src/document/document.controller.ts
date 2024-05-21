import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Req, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { AttributeValueService } from 'src/attribute-value/attribute-value.service';
import { UpdateDocumentDto } from './dto/updateDocment.dto';
import { FormDocumentDto } from './dto/form-document.dto';
import { DocxServiceService } from 'src/core/service/docx-service.service';
import { convertDataToDocx } from 'util/convertDataToDocx';
import { CreateNotificationReceiverDto, CreateNotificationsDto } from 'src/notifications/dto/createNotification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { OfficerService } from 'src/officer/officer.service';
import { UserService } from 'src/user/user.service';
import { ServiceService } from 'src/service/service.service';
import { ProceduralStep } from 'src/procedural-step/entities/proceduralStep.entity';
import { ProceduralStepService } from 'src/procedural-step/procedural-step.service';
import { Document } from './entities/document.entity';

@ApiTags('Document')
@ApiBearerAuth()
@Controller('document')
export class DocumentController {
    constructor(
        private documentService: DocumentService,
        private attributeValueService: AttributeValueService,
        private docxServiceService: DocxServiceService,
        private notificationsService: NotificationsService,
        private officerService: OfficerService,
        private userService: UserService,
        private serviceservice: ServiceService,
        private proceduralStepsService: ProceduralStepService
    ){}


    

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Req() req: any,@Body() body: FormDocumentDto):Promise<any>{

        // console.log(body);
        // console.log(req['user_data']);

        // for (const obj of body.attribute) {
        //     const key = Object.keys(obj)[0];
        //     console.log(key);
            
        // }
        const user_identifier = req['user_data'].identifier;
        const document = await this.documentService.create(Number(req['user_data'].id),req['user_data'].type,Number(body.service_id))
        if(!document) throw new HttpException('can not create document',HttpStatus.BAD_REQUEST)
        
        let result =  await this.attributeValueService.create(Number(document.id),body.attribute);

        // create notification


        // lấy danh sách những người sẽ nhận được thông báo
        let createNotificationsDto = new CreateNotificationsDto();
        // let userReceivers = await this.serviceservice.getById(Number(body.service_id));
        

        
        
        let userReceivers = await this.proceduralStepsService.getUserProduraStep(1,Number(body.service_id) ); //step, service
        createNotificationsDto.notification_receivers = userReceivers.map((officer) => {
            let createNotificationReceiverDto: CreateNotificationReceiverDto = new CreateNotificationReceiverDto();
            createNotificationReceiverDto.type_user = 'officer';
            createNotificationReceiverDto.receiver_identifier = officer.user_id;
            return createNotificationReceiverDto;
        })
        
        createNotificationsDto.actor_identifier = user_identifier;
        createNotificationsDto.entity_type = 'document';
        createNotificationsDto.entity_id = document.id;
        createNotificationsDto.is_for_all = false;
        createNotificationsDto.notification_type = 2

        this.notificationsService.create(createNotificationsDto)

        return document;
    }
    
   


    @Put(':id')
    @UsePipes(ValidationPipe)
    async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto, @Req() req: any):Promise<any>{
        console.log(id);
        console.log(updateDocumentDto);
        const user_identifier = req['user_data'].identifier;
        const document = await this.documentService.getDocumentById(Number(id));
        
        const result = await this.documentService.update(Number(id),updateDocumentDto);
        const document_updated = await this.documentService.getDocumentById(Number(id));
        

        console.log('---------------result');
        
        console.log(result);
        
        // create notification
        
        let userReceivers = null;
        let createNotificationReceiverDto: CreateNotificationReceiverDto = new CreateNotificationReceiverDto();
        // check is officer
        if(document.type_user == 'officer'){
            
            userReceivers = await this.officerService.getById(Number(document.user_id));
            createNotificationReceiverDto.type_user = 'officer';
        }else{
            userReceivers = await this.userService.getUserById(Number(document.user_id));
            createNotificationReceiverDto.type_user = 'student';
        }
        let createNotificationsDto = new CreateNotificationsDto();
        createNotificationsDto.actor_identifier = user_identifier;
        createNotificationsDto.entity_type = 'document';
        createNotificationsDto.entity_id = document.id;
        createNotificationsDto.is_for_all = false;
        


        
        createNotificationReceiverDto.receiver_identifier = userReceivers.identifier;
        createNotificationsDto.notification_receivers = [
            createNotificationReceiverDto
        ];
        
        if(updateDocumentDto.confirm == 'confirm'){

            if(document_updated.status == 2 && document.status == 1){
                //thông báo đã xác nhận đơn 
                createNotificationsDto.notification_type = 3
                this.notificationsService.create(createNotificationsDto)
            }
            if(document_updated.status == 3 && document.status == 2){
                // thông báo đơn đã hoàn thành
                createNotificationsDto.notification_type = 5
                this.notificationsService.create(createNotificationsDto)
            }
            
        }else{
                // thông báo đơn đã bị từ chối
                createNotificationsDto.notification_type = 4
                this.notificationsService.create(createNotificationsDto)
        }
        
        console.log('--------------------------------hello world---------------------------');
        console.log(createNotificationsDto);
        
        

        




        // thông báo cho cán bộ phòng tiếp theo
        // điều kiện là đơn phải được chuyển tiếp và không bị hủy và phòng tiếp theo không được trùng với phòng hiện tại. nêu trùng sẽ dẫn đến hiện tượng thông báo 2 lần
        if(document_updated.status !== 0 && (document_updated.status !== 3)){
            let document_2:Document = await this.documentService.getDocumentById2(result.id);
            let createNotificationsDto2 = new CreateNotificationsDto();
            // let userReceivers = await this.serviceservice.getById(Number(body.service_id));
            

            
            
            let userReceivers = await this.proceduralStepsService.getUserProduraStep(document_2.proceduralStep.step,Number(document_2?.service?.id) ); //step, service
            createNotificationsDto2.notification_receivers = userReceivers.map((officer) => {
                let createNotificationReceiverDto: CreateNotificationReceiverDto = new CreateNotificationReceiverDto();
                createNotificationReceiverDto.type_user = 'officer';
                createNotificationReceiverDto.receiver_identifier = officer.user_id;
                return createNotificationReceiverDto;
            })
            
            createNotificationsDto2.actor_identifier = user_identifier;
            createNotificationsDto2.entity_type = 'document';
            createNotificationsDto2.entity_id = document.id;
            createNotificationsDto2.is_for_all = false;
            createNotificationsDto2.notification_type = 10

            this.notificationsService.create(createNotificationsDto2)
        }
        return document_updated;
    }
    @Get('/gen-docx/:id')
    async genDocx(@Param('id') id: number):Promise<any>{
        let data = await this.documentService.getDocumentById(id);
        let dataConverted = convertDataToDocx(data?.attributeValues);
        await this.docxServiceService.genDocx(dataConverted,'/public/auto_gen_docx/test2.docx');
    }

    @Get('all')
    async getAll(@Request() req: any):Promise<any[]>{
        console.log("okl");
        console.log(req['user_data'])

        return await this.documentService.getAll(Number(req['user_data'].department_id), req['user_data'].isAdmin);
    }
    
    @Get(':id')
    async getDocumentById(@Param('id') id: number): Promise<any>{
        return await this.documentService.getDocumentById(id);
        // let data = await this.documentService.getDocumentById(id);
        // console.log(data?.attributeValues);
        
        // let result = convertDataToDocx(data?.attributeValues);
        // return result;
    }


    

    

}
