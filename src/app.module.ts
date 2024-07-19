import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

const MDC =
  'mongodb+srv://admin:12345@aducationscourses.a4vyllo.mongodb.net/?retryWrites=true&w=majority&appName=AducationsCourses';

@Module({
  imports: [MongooseModule.forRoot(MDC)],
  controllers: [AppController, TransactionController],
  providers: [
    AppService,
    TransactionService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
