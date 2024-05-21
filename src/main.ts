import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Hệ thống 1 cửa')
    .setDescription('API cho hệ thống 1 cửa')
    .setVersion('1.0.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Department')
    .addTag('Post')
    .addTag('File')
    .addTag('PostComment')
    .addTag('PostReaction')
    .addTag('Service')
    .addTag('AttributeFormService')
    .addTag('AttributeFormEnum')
    .addTag('ProceduralStep')
    .addTag('Document')
    .addTag('Officer')
    .addTag('Role')
    .addTag('Faculties')
    .addTag('form-file')
    .addTag('Download')
    .addTag('document-activity-trace')
    .addTag('Notifications')
    .addTag('Notification-type')
    .addTag('Notification-receiver')
    .addTag('Question')
    .addTag('Question-media-content')
    .addTag('Question-seen')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useStaticAssets(join(__dirname,'../../uploads'))


  await app.listen(3000);
}
bootstrap();
