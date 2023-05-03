import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './shared/data-source';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dataSource
    .initialize()
    .then(() => {
      /* eslint-disable-next-line no-console */
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      /* eslint-disable-next-line no-console */
      console.error('Error during Data Source initialization', err);
    });

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('_blik API doc')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('_blik')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  // /Setup Swagger

  await app
    .useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    )
    .listen(3000);
}

bootstrap().then((r) => {
  /* eslint-disable-next-line no-console */
  console.log('Application has been started on port 3000!');
});
