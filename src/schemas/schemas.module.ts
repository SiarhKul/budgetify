import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { MoneyAccount, MoneyAccountSchema } from './money-account.schema';
import { FileUpload, FileUploadSchema } from './file-upload.schema';
import { User, UserSchema } from './user.schema';
import { PiggyBank, PiggyBankSchema } from './piggy-bank.schema';
import {
  PiggyBankDeposit,
  PiggyBankDepositSchema,
} from './piggy-bank-deposit.schema';
import { Subscription, SubscriptionSchema } from './subscription.schema';

const schemas = MongooseModule.forFeature([
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
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: PiggyBank.name,
    schema: PiggyBankSchema,
  },
  {
    name: PiggyBankDeposit.name,
    schema: PiggyBankDepositSchema,
  },
  {
    name: Subscription.name,
    schema: SubscriptionSchema,
  },
]);

@Module({
  imports: [schemas],
  exports: [schemas],
})
export class SchemasModule {}
