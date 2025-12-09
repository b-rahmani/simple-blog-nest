import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );


    // -----------------------
  // Swagger Config
  // -----------------------
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('REST API for your project')
    .setVersion('1.0')
    .addBearerAuth() // برای توکن JWT اگر استفاده بشه
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // URL = http://localhost:3000/api-docs

  // -----------------------

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
