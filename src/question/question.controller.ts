import { Body, Controller, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { FormCreateQuestionDto } from './dto/formCreateQuestion.dto';
import { QuestionService } from './question.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionMediaContent } from 'src/question-media-content/entities/questionMediaContent.entity';
import { QuestionMediaContentService } from 'src/question-media-content/question-media-content.service';

@Controller('question')
@ApiTags('Question')
@ApiBearerAuth()
export class QuestionController {
    constructor(
        private questionService: QuestionService,
        private questionMediacontentService: QuestionMediaContentService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Req() req: any,@Body() body: FormCreateQuestionDto): Promise<any>{
        const user_id = req['user_data'].id;
        const type_user = req['user_data'].type;
        body.user_id = user_id;
        body.type_user = type_user;

        const newQuestion = await this.questionService.create(body);

        let newMediaContentList: QuestionMediaContent[] = body.array_media_content.map((value) => {
            let mediaContent: QuestionMediaContent = new QuestionMediaContent();
            mediaContent.question = newQuestion;
            mediaContent.type = value.type;
            mediaContent.url = value.url;
            return mediaContent;
        })


        let insertMediaContent = await this.questionMediacontentService.createMultiple(newMediaContentList);
        return true;


    }
}
