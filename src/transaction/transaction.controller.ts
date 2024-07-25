import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: TransactionDto) {
    return this.transactionService.createTransaction(transaction);
  }

  @Delete(':id')
  delete(@ParamMongoObjectId('id') id: string) {
    return this.transactionService.deleteTransaction(id);
  }

  @Get()
  getAllTransactions() {
    return this.transactionService.getAllTransactions();
  }

  @Put(':id')
  update(
    @ParamMongoObjectId('id') id: string,
    @Body() transaction: TransactionDto,
  ) {
    return this.transactionService.updateTransaction(id, transaction);
  }
}
