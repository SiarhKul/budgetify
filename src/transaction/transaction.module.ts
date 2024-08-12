import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../schemas/transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import {
  MoneyAccount,
  MoneyAccountSchema,
} from '../schemas/money-account.schema';
import { AccountService } from '../account/account.service';

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
    ]),
  ],
  providers: [TransactionService, AccountService],
  controllers: [TransactionController],
})
export class TransactionModule {}
