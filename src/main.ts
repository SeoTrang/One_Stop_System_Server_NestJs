import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

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
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
