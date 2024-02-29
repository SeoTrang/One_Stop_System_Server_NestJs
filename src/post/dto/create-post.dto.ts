import { Department } from "src/department/entities/department.entity";

export class CreatePostDto{
    title: string;
    caption: string;
    department: Department;
    user_id: number;
    type_user: string;

}