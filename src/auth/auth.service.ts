import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserLoginDto } from './dto/user-login.dto';
import { Officer } from 'src/officer/entities/officer.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Officer) private officerRepository: Repository<Officer>,
        private jwtService: JwtService,
        private configService:ConfigService
    ){}

    private async hashPassword(password: string): Promise<string>{
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password,salt);
        return hash;
    }
    private async generateToken(payload:any){
        // console.log(this.configService.get<string>('EXP_IN_REFRESH_TOKEN'));
        // console.log(this.configService.get<string>('SECRET_KEY'));
        
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload,{
            secret: this.configService.get<string>('SECRET_KEY'),
            expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN')
        });
        // await this.userRepository.update(
        //     {email: payload.email},
        //     {refresh_token: refresh_token}
        // )

        return {
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    async refreshToken(refresh_token:string):Promise<any>{
        try {
            // console.log(refresh_token);
            
            const verify = await this.jwtService.verifyAsync(refresh_token,{
                secret:this.configService.get<string>('SECRET_KEY')
            })

            const payload = {id: verify.id, identifier: verify.identifier};
            return this.generateToken(payload)
            // console.log(verify);

            // const checkExistToken = await this.userRepository.findOne({
            //     where:{identifier: verify.identifier}
            // })
            // console.log(checkExistToken);
            // if(checkExistToken){
            //     const payload = {id: checkExistToken.id, email: checkExistToken.email};
            //     return this.generateToken(payload)
            // }else{
            //     throw new HttpException('Refresh token is not valid',HttpStatus.BAD_REQUEST)
            // }
        } catch (error) {
            throw new HttpException('refresh token is not valid',HttpStatus.BAD_REQUEST);
        }
        
    }

    async userLogin(userLoginDto: UserLoginDto):Promise<any>{
        const user = await this.userRepository.findOneBy({
            identifier: userLoginDto.identifier
        })
        if(!user) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
        const checkPassword = await bcrypt.compareSync(userLoginDto.password,user.password);
        if(!checkPassword) throw new HttpException('Password is incorrect',HttpStatus.BAD_REQUEST);

        const payload = {id:user.id,identifier: user.identifier,type:'student'};
        return await this.generateToken(payload);
    }

    async officerLogin(userLoginDto: UserLoginDto):Promise<any>{
        const user = await this.officerRepository.findOneBy({
            identifier: userLoginDto.identifier
        })
        if(!user) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
        const checkPassword = await bcrypt.compareSync(userLoginDto.password,user.password);
        if(!checkPassword) throw new HttpException('Password is incorrect',HttpStatus.BAD_REQUEST);

        const payload = {id:user.id,identifier: user.identifier,type:'officer', isAdmin:user.isAdmin};
        return await this.generateToken(payload);
    }
}
