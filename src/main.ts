import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MongoExceptionFilter } from './filters/exception-mongoose-error.filter';
import { ExceptionsLoggerFilter } from './filters/exception-loger.filter';
import { runMigrations } from '../config/migrations-setup';
import { Logger } from '@nestjs/common';

const logger = new Logger('MAIN');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ExceptionsLoggerFilter());
  app.useGlobalFilters(new MongoExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);
}

runMigrations(logger).catch((err) => logger.error(err));

bootstrap();
