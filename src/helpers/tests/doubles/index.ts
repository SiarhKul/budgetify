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
import {
  PiggyBankDeposit,
  PiggyBankDepositSchema,
} from '../../../schemas/piggy-bank-deposit.schema';
import {
  PiggyBankDepositDto,
} from '../../../piggy-bank/dto/piggy-bank-deposit.dto';
import { ObjectId } from 'mongodb';
import {
  MoneyAccount,
  MoneyAccountSchema,
} from '../../../schemas/money-account.schema';
import {
  Subscription,
  SubscriptionDocument,
  SubscriptionSchema,
} from '../../../schemas/subscription.schema';
import {
  CreateSubscriptionDto,
} from '../../../subscription/dto/create-subscription.dto';

//MODELs
export const TransactionModel = mongoose.model(
  Transaction.name,
  TransactionSchema,
);

export const PiggyBankModel = mongoose.model(PiggyBank.name, PiggyBankSchema);

export const PiggyBankDepositModel = mongoose.model(
  PiggyBankDeposit.name,
  PiggyBankDepositSchema,
);

export const AccountModel = mongoose.model(
  MoneyAccount.name,
  MoneyAccountSchema,
);
export const SubscriptionsModel = mongoose.model(
  Subscription.name,
  SubscriptionSchema,
);

//MISKs
export const OBJECT_ID_DUMMY = '669e8c31d88d0ec8e0ffc467';
export const USER_ID_DUMMY = '66aa09697fc697253e201580';
export const ACCOUNT_ID_DUMMY = '66abf6a97bf3e2f09f4f843b';
export const PIGGY_BANK_ID_DUMMY = '66ad4347db1f470fda343959';
export const SUBSCRIPTION_ID_DUMMY = '66ad4347db1f470fda343959';

//DTOs
export const TRANSACTION_DTO_DUMMY: TransactionDto = {
  transactionType: TransactionType.INCOME,
  title: 'some title',
  categories: Categories.HOME,
  amount: 1,
  paymentDate: new Date(),
  payee: 'Jon Doe',
  description: 'dummy description',
  accountId: ACCOUNT_ID_DUMMY,
};

export const PIGGY_BANK_DTO_DUMMY: PiggyBankDto = {
  deposits: [],
  goal: 'PC',
  goalAmount: 100,
  accountId: '669e8c31d88d0ec8e0ffc411',
};

export const PIGGY_BANK_DEPOSIT_DTO_DUMMY: PiggyBankDepositDto = {
  amountToSave: 100,
  date: new Date(),
  piggyBankId: new ObjectId(OBJECT_ID_DUMMY),
};

export const SUBSCRIPTION_DTO_DUMMY: CreateSubscriptionDto = {
  title: 'some title',
  categories: Categories.NETFLIX,
  amount: 5,
  paymentDate: new Date('2012-03-12'),
  description: 'description2',
  accountId: ACCOUNT_ID_DUMMY,
};

//DOCUMENTS
export const SUBSCRIPTION_DOCUMENT_DUMMY: SubscriptionDocument =
  new SubscriptionsModel(SUBSCRIPTION_DTO_DUMMY);
