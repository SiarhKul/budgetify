import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './helpers/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);

  const configService = app.get(ConfigService);
  const port = configService.get<number | undefined>('port');

  //todo: restore 'await app.listen(port)'
  await app.listen(port);
}
bootstrap();
