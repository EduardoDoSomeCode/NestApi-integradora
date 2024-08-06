import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (body) {
      body = JSON.parse(JSON.stringify(body, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
      originalJson.call(this, body);
    };
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Better Me API')
    .setDescription('Catalog of different service use for the Betterme application')
    .setVersion('1.0')
    .addTag('betterme')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

