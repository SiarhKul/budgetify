import { Module } from '@nestjs/common';
import { AccountController } from './money-account.controller';
import { MoneyAccountService } from './money-account.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MoneyAccount,
  MoneyAccountSchema,
} from '../schemas/money-account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MoneyAccount.name,
        schema: MoneyAccountSchema,
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [MoneyAccountService],
})
export class MoneyAccountModule {}
