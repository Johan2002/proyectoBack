import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformAndExceptionInterceptor } from './interceptor/error-interceptor';
// import { LoggingInterceptor } from './interceptor/typeorm-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformAndExceptionInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
