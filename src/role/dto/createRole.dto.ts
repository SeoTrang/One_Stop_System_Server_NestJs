import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto{
    @IsNotEmpty()
    @ApiProperty()
    label: string;

    @ApiProperty({ required: false })
    routerLink: string;

   
    @ApiProperty({ required: false })
    icon: string;

    @ApiProperty({ required: false })
    parent_id: number;
}