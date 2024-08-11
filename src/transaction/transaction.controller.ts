import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() transaction: TransactionDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.transactionService.createTransaction(transaction, files);
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
