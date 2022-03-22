import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import morgan from 'morgan';

import { AppModule } from './app.module';
import { setupSwagger } from './setup.swagger';
import './global.helper';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {cors: true});
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT')
  app.use(compression()); // Nén toàn bộ response của ứng dụng
  app.use(morgan('combined')); // Log truy cập ứng dụng
  app.useGlobalPipes(new ValidationPipe({transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true}));
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.setGlobalPrefix('api/v1');
  setupSwagger(app);
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap')
}
bootstrap();