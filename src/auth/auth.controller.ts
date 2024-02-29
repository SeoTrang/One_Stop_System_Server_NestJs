import { Body, Controller, Post, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/login')
    @SetMetadata('isPublic',true)
    @ApiResponse({
        status: 200,
        description: 'Login successfully'
    })
    @UsePipes(ValidationPipe)
    async userLogin(@Body() userLogin: UserLoginDto):Promise<any>{
        return await this.authService.userLogin(userLogin);
    }

    @Post('/officer/login')
    @SetMetadata('isPublic',true)
    @ApiResponse({
        status: 200,
        description: 'Login successfully'
    })
    @UsePipes(ValidationPipe)
    async officerLogin(@Body() userLogin: UserLoginDto):Promise<any>{
        return await this.authService.officerLogin(userLogin);
    }
}
