import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AttributeFormService } from "src/attribute-form-service/entities/attributeFormService.entity";

export class CreateAttributeFormEnumDto{
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    
    attributeFormService: AttributeFormService;
}