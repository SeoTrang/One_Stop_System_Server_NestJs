import { AttributeFormService } from "src/attribute-form-service/entities/attributeFormService.entity";
import { Document } from "src/document/entities/document.entity";

export class AttributeValueDto{
    value: string;
    document: Document;
    attributeFormService: AttributeFormService;
}