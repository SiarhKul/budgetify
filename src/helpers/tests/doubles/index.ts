import { TransactionDto } from '../../../transaction/dto/transaction.dto';
import {
  Categories,
  TransactionType,
} from '../../../ts/transactons/transactions.enums';
import {
  Transaction,
  TransactionSchema,
} from '../../../schemas/transaction.schema';
import mongoose from 'mongoose';
import { PiggyBankDto } from '../../../piggy-bank/dto/piggy-bank.dto';
import { PiggyBank, PiggyBankSchema } from '../../../schemas/piggy-bank.schema';

//MODELs
export const TransactionModel = mongoose.model(
  Transaction.name,
  TransactionSchema,
);

export const PiggyBankModel = mongoose.model(PiggyBank.name, PiggyBankSchema);

//DTOs
export const TRANSACTION_DTO_DUMMY: TransactionDto = {
  transactionType: TransactionType.INCOME,
  title: 'some title',
  categories: Categories.HOME,
  amount: 1,
  paymentDate: new Date(),
  payee: 'Jon Doe',
  description: 'dummy description',
};

export const PIGGY_BANK_DTO_DUMMY: PiggyBankDto = {
  deposits: [],
  goal: 'House',
  goalAmount: 100,
};

//MISKs
export const OBJECT_ID_DUMMY = '669e8c31d88d0ec8e0ffc467';
