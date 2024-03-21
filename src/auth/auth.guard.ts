import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private reflector: Reflector,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}
    async canActivate(context: ExecutionContext):  Promise<boolean>{

        const checkPublic = this.reflector.getAllAndOverride<string[]>("isPublic",[
            context.getHandler(),
            context.getClass()
        ])

        if(checkPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token,{
                secret: this.configService.get<string>("SECRET_KEY")
            })

            // let user = null;
            // if(payload.type == 'student'){
            //     user = await this.userRepository.findOneBy({id: payload.id, identifier: payload.identifier})
            // }
            // request['user'] = user;
            request['user_data'] = payload;

        } catch (error) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string|undefined{
        const [type,token] = request.headers.authorization ? request.headers.authorization.split(' ') : [];
        return type === "Bearer" ? token : undefined;
    }
    
}