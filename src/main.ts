import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.disable('x-powered-by');
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('XC-REPORTS-API')
    .setDescription('This is a API to XC-Report-web')
    .setVersion('1.0')
    .addTag('XC-reports')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(AppModule.port);
}
bootstrap();
