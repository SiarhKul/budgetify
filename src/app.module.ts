import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';

const MDC =
  'mongodb+srv://admin:12345@aducationscourses.a4vyllo.mongodb.net/?retryWrites=true&w=majority&appName=AducationsCourses';

@Module({
  imports: [MongooseModule.forRoot(MDC), TransactionModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
