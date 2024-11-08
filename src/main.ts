import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuración de CORS
  app.enableCors();

  // Configuración de validación global
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Configuración de rate limiting
  app.use(
    rateLimit({
      windowMs: configService.get('rateLimiting.windowMs'),
      max: configService.get('rateLimiting.max'),
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Dealers API')
    .setDescription('The dealers API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('port');
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
