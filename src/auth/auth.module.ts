import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Officer } from 'src/officer/entities/officer.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Officer]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule vào để sử dụng ConfigService
      inject: [ConfigService], // Inject ConfigService vào factory
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('EXP_IN_REFRESH_TOKEN') },
      }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
