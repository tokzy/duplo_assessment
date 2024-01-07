import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Queue } from 'bull';
import { useContainer } from 'class-validator';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exceptions/exceptions.error';
import { swaggerSetup } from './configs/swagger/swagger.setup';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );
  swaggerSetup(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bull-board');

  const aQueue = app.get<Queue>(`BullQueue_tax`);

  createBullBoard({
    queues: [new BullAdapter(aQueue)],
    serverAdapter,
  });

  app.use(
    '/bull-board',
    expressBasicAuth({
      users: {
        [process.env.BullBoard_Name]: process.env.BullBoard_Password,
      },
      challenge: true,
    }),
    serverAdapter.getRouter(),
  );
  const port = process.env.appPort || 7006;
  await app.listen(port);
}
bootstrap();
