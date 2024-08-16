import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { TransactionDocument } from '../schemas/transaction.schema';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() transaction: TransactionDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|png/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1024, // 1MB
        })
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File[],
  ) {
    return this.transactionService.createTransaction(transaction, files);
  }

  @Delete(':id')
  delete(@ParamMongoObjectId('id') id: string) {
    return this.transactionService.deleteTransaction(id);
  }

  @Get()
  getAllTransactions(): Promise<TransactionDocument[]> {
    return this.transactionService.getAllTransactions();
  }

  @Put(':id')
  update(
    @ParamMongoObjectId('id') id: string,
    @Body() transaction: TransactionDto,
  ): Promise<TransactionDocument> {
    return this.transactionService.updateTransaction(id, transaction);
  }

  @Get(':id')
  getTransactionById(
    @ParamMongoObjectId('id') id: string,
  ): Promise<TransactionDocument> {
    return this.transactionService.getTransactionById(id);
  }
}
