import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [],
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
