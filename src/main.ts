import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

function replacer(key: any, value: any) {
  if (typeof value === 'bigint') {
    // Convertir BigInt a string y tomar los primeros 3 números
    return value.toString().slice(0, 3);
  }
  return value;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuración global del ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
      if (typeof body === 'object') {
        body = JSON.stringify(body, replacer);
      }
      return originalSend.call(this, body);
    };
    next();
  });


  await app.listen(3000);
}
bootstrap();

