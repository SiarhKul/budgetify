import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../schemas/transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Account, AccountSchema } from '../schemas/account.schema';
import { AccountService } from '../account/account.service';
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
        name: Account.name,
        schema: AccountSchema,
      },
      {
        name: FileUpload.name,
        schema: FileUploadSchema,
      },
    ]),
  ],
  providers: [TransactionService, AccountService, FileUploadService],
  controllers: [TransactionController],
})
export class TransactionModule {}
