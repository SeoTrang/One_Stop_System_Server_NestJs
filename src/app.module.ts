import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { RoleModule } from './role/role.module';
import { LoggingMiddleware } from 'log/logging.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FacultiesModule } from './faculties/faculties.module';
import { FormFileModule } from './form-file/form-file.module';
import { DownloadModule } from './download/download.module';
import { Service } from './core/service/.service';
import { DocxServiceService } from './core/service/docx-service.service';
import { DocumentActivityTraceModule } from './document-activity-trace/document-activity-trace.module';
import { NotificationTypeModule } from './notification-type/notification-type.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationReceiverModule } from './notification-receiver/notification-receiver.module';
import { QuestionModule } from './question/question.module';
import { QuestionMediaContentModule } from './question-media-content/question-media-content.module';
import { QuestionSeenModule } from './question-seen/question-seen.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads', // Đường dẫn bạn muốn sử dụng để truy cập các file từ trình duyệt
      serveStaticOptions: {
        index: false, // Tắt chức năng hiển thị index.html khi truy cập thư mục
        setHeaders: (res, path) => {
          // Thiết lập header để cho phép trình duyệt tải các tài nguyên từ thư mục uploads
          res.setHeader('Cache-Control', 'public, max-age=31536000');
        },
      },
    }),
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
        signOptions: {
          expiresIn: configService.get<string>('EXP_IN_REFRESH_TOKEN'),
        },
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
    OfficerModule,
    RoleModule,
    FacultiesModule,
    FormFileModule,
    DownloadModule,
    DocumentActivityTraceModule,
    NotificationTypeModule,
    NotificationsModule,
    NotificationReceiverModule,
    QuestionModule,
    QuestionMediaContentModule,
    QuestionSeenModule,
  ],
  controllers: [AppController, FileController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    Service,
    DocxServiceService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Áp dụng middleware cho tất cả các route
  }
}
