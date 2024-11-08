import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EventEmitter } from 'events';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PACTH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    exposedHeaders: ['Authorization'], // Encabezados que pueden ser expuestos al cliente
  });

  EventEmitter.defaultMaxListeners = 11;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Ventas')
    .setDescription('Documentación de la API de ventas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
