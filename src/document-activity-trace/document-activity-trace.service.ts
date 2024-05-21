import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocTraceDto } from './dto/create-doc-trace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentActivityTrace } from './entities/documentActivityTrace.entity';
import { Repository } from 'typeorm';
import { Document } from 'src/document/entities/document.entity';
import { Officer } from 'src/officer/entities/officer.entity';
import { ProceduralStep } from 'src/procedural-step/entities/proceduralStep.entity';

@Injectable()
export class DocumentActivityTraceService {
    constructor(
        @InjectRepository(DocumentActivityTrace) private documentActivityTraceRepository: Repository<DocumentActivityTrace>,
        @InjectRepository(Document) private documentRepository: Repository<Document>,
        @InjectRepository(Officer) private officerRepository: Repository<Officer>,
        @InjectRepository(ProceduralStep) private proceduralStepRepository: Repository<ProceduralStep>,

    ){}

    async create(createDocTraceDto: CreateDocTraceDto): Promise<any>{
        let documentActivityTrace: DocumentActivityTrace = new DocumentActivityTrace();
       
        
        documentActivityTrace.document = await this.documentRepository.findOne({
            where: {
                id: Number(createDocTraceDto.documentId)
            }
        })
        

        documentActivityTrace.proceduralStep = await this.proceduralStepRepository.findOne({
            where:{
                id: createDocTraceDto.proceduralStepId
            }
        })

        documentActivityTrace.status = createDocTraceDto.status;

        documentActivityTrace.officer = await this.officerRepository.findOne({
            where:{
                id: createDocTraceDto.officerId
            }
        })


        return await this.documentActivityTraceRepository.save(documentActivityTrace);
    }

    async getByDocumentId(document_id: number): Promise<any>{
        try {
            let activity_trace = await this.documentActivityTraceRepository.find({
                where: {
                    document: {
                        id: document_id
                    }
                },
                relations: {
                    officer: true,
                    proceduralStep: {
                        department: true
                    }
                }
            })
            return activity_trace;
        } catch (error) {
            console.log(error);
            new HttpException('server error: '+ error.message,HttpStatus.INTERNAL_SERVER_ERROR);
            
        }
    }
}
