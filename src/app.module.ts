import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/entities/user.entity';
import { DepartmentModule } from './department/department.module';
import { PostModule } from './post/post.module';
import { PostMediaContentModule } from './post-media-content/post-media-content.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import { PostReactionModule } from './post-reaction/post-reaction.module';
import { ServiceModule } from './service/service.module';
import { AttributeFormServiceModule } from './attribute-form-service/attribute-form-service.module';
import { AttributeFormEnumModule } from './attribute-form-enum/attribute-form-enum.module';
import { ProceduralStepModule } from './procedural-step/procedural-step.module';
import { DocumentModule } from './document/document.module';
import { AttributeValueModule } from './attribute-value/attribute-value.module';
import { OfficerModule } from './officer/officer.module';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    AuthModule, 
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('EXP_IN_REFRESH_TOKEN') },
      }),
    }),
    DepartmentModule,
    PostModule,
    PostMediaContentModule,
    FileModule,
    PostCommentModule,
    PostReactionModule,
    ServiceModule,
    AttributeFormServiceModule,
    AttributeFormEnumModule,
    ProceduralStepModule,
    DocumentModule,
    AttributeValueModule,
    OfficerModule
  ],
  controllers: [AppController, FileController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {}
