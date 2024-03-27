import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class AttributeFormServiceDto{
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsIn(['Input', 'Select', 'Checkbox'])
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsNotEmpty()
    service_id: number;
}