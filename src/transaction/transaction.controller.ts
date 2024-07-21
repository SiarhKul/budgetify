import { Body, Controller, Post } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: TransactionDto) {
    return this.transactionService.createTransaction(transaction);
  }
}
