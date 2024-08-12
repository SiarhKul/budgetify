import { Module } from '@nestjs/common';
import { PiggyBankController } from './piggy-bank.controller';
import { PiggyBankService } from './piggy-bank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PiggyBank, PiggyBankSchema } from '../schemas/piggy-bank.schema';
import {
  PiggyBankDeposit,
  PiggyBankDepositSchema,
} from '../schemas/piggy-bank-deposit.schema';
import {
  MoneyAccount,
  MoneyAccountSchema,
} from '../schemas/money-account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PiggyBank.name,
        schema: PiggyBankSchema,
      },
      {
        name: PiggyBankDeposit.name,
        schema: PiggyBankDepositSchema,
      },
      {
        name: MoneyAccount.name,
        schema: MoneyAccountSchema,
      },
    ]),
  ],
  providers: [PiggyBankService],
  controllers: [PiggyBankController],
})
export class PiggyBankModule {}
