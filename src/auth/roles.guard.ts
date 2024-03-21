import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector: Reflector
    ){}
    canActivate(context: ExecutionContext): boolean {

        console.log('vao roles guard');
        
        // throw new Error("Method not implemented.");
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles',[
            context.getHandler(),
            context.getClass()
        ]);

        
        if(!requiredRoles){
            return true;
        }

        console.log('required roles : ', requiredRoles);
        const {user} = context.switchToHttp().getRequest();
        const {user_data} = context.switchToHttp().getRequest();
        console.log(user);
        // console.log(user_data);
        if(user?.isAdmin == true) return true;
        
        // console.log(requiredRoles.some(role => user.role.split(',').includes(role)));
        
        
        return requiredRoles.some(role => user_data.type.split(',').includes(role));
    }

}