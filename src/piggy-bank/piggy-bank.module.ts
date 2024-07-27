import { Module } from '@nestjs/common';
import { PiggyBankController } from './piggy-bank.controller';
import { PiggyBankService } from './piggy-bank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PiggyBank, PiggyBankSchema } from '../schemas/piggy-bank.schema';
import {
  PiggyBankDeposit,
  PiggyBankDepositSchema,
} from '../schemas/piggy-bank-deposit.schema';

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
    ]),
  ],
  providers: [PiggyBankService],
  controllers: [PiggyBankController],
})
export class PiggyBankModule {}
