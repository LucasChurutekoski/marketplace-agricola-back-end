import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  console.log('Data do Node:', new Date());
  console.log('ISO:', new Date().toISOString());
  await app.listen(process.env.PORT ?? 3000);

}
await bootstrap();
