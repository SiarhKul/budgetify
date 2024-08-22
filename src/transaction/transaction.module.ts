import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MoneyAccountService } from '../money-account/money-account.service';
import { FileUploadService } from '../file-upload/file-upload.service';
import { SchemasModule } from '../schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  providers: [TransactionService, MoneyAccountService, FileUploadService],
  controllers: [TransactionController],
})
export class TransactionModule {}
