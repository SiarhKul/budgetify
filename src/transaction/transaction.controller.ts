import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

import { ObjectId } from 'mongodb';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: TransactionDto) {
    return this.transactionService.createTransaction(transaction);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionService.deleteTransaction(new ObjectId(id));
  }
}
