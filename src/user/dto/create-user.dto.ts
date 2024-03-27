import { Gender } from 'src/enum/enum';
import { Faculties } from 'src/faculties/entities/faculties.entity';


export class CreateUserDto {
  identifier: string;
  name: string;
  password: string;
  batch: string;
  in_class: string;
  address: string;
  gender: Gender;
  avatar: string;
  faculty: Faculties;
  email: string;
  phone: string;

  constructor(
    identifier : string,
    name : string,
    password : string,
    batch : string,
    in_class: string,
    address : string,
    gender : Gender,
    avatar : string,
    faculty : Faculties,
    email: string,
    phone: string
  ) {
    this.identifier = identifier;
    this.name = name;
    this.password = password;
    this.batch = batch;
    this.address = address;
    this.gender = gender;
    this.avatar = avatar;
    this.faculty = faculty;
    this.in_class = in_class;
    this.email = email;
    this.phone = phone;
  }
}
