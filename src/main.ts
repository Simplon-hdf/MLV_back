import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { WsAdapter } from '@nestjs/platform-ws';
import * as cookieParser from 'cookie-parser';

//create http server

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //generate swagger json
  const config = new DocumentBuilder()
    .setTitle('MLV API')
    .addServer('http://localhost:3000/api', 'Local server')
    .setDescription('The MLV  API description')
    .setVersion('0.1')
    .addTag('MLV')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  //set base path
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  //  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  //session
  app.use(cookieParser());
  //register user in cookie to not count visitor
  app.use((req, res, next) => {
    if (req.cookies['connect.sid']) {
      res.cookie('user', 'user');
    }
    next();
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
