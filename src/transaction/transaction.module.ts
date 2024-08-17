import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../schemas/transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import {
  MoneyAccount,
  MoneyAccountSchema,
} from '../schemas/money-account.schema';
import { MoneyAccountService } from '../money-account/money-account.service';
import { FileUpload, FileUploadSchema } from '../schemas/file-upload.schema';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
      {
        name: MoneyAccount.name,
        schema: MoneyAccountSchema,
      },
      {
        name: FileUpload.name,
        schema: FileUploadSchema,
      },
    ]),
  ],
  providers: [TransactionService, MoneyAccountService,FileUploadService],
  controllers: [TransactionController],
})
export class TransactionModule {}
