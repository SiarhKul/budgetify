import { TransactionDto } from '../../../transaction/dto/transaction.dto';
import {
  Categories,
  TransactionType,
} from '../../../ts/transactons/transactions.enums';
import { TransactionSchema } from '../../../schemas/transaction.schema';
import mongoose from 'mongoose';

export const TransactionModel = mongoose.model(
  'Transaction',
  TransactionSchema,
);

export const TRANSACTION_DTO_DUMMY: TransactionDto = {
  transactionType: TransactionType.INCOME,
  title: 'some title',
  categories: Categories.HOME,
  amount: 1,
  paymentDate: new Date(),
  payee: 'Jon Doe',
  description: 'dummy description',
};

export const OBJECT_ID_DUMMY = '669e8c31d88d0ec8e0ffc467';
