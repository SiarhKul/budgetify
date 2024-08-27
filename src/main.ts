import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MongoExceptionFilter } from './filters/exception-mongoose-error.filter';
import { ExceptionsLoggerFilter } from './filters/exception-loger.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new ExceptionsLoggerFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);
}
bootstrap();
