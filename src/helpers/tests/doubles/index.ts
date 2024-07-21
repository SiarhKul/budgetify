import { TransactionDto } from '../../../transaction/dto/transaction.dto';
import { Categories, TransactionType } from '../../../enums/common';
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
