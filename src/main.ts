import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/modules/app/app.module';
import Helmet from 'helmet';
import Compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();
  app.use(Helmet());
  app.use(Compression());

  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}
bootstrap();
