import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';
import { Model, Types } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionType } from '../ts/transactons/transactions.enums';
import { MoneyAccount } from '../schemas/money-account.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,

    @InjectModel(MoneyAccount.name)
    private readonly accountModel: Model<MoneyAccount>,
  ) {}

  async createTransaction(
    transaction: TransactionDto,
  ): Promise<TransactionDocument> {
    const amount =
      transaction.transactionType === TransactionType.INCOME
        ? transaction.amount
        : -transaction.amount;

    await this.accountModel.findOneAndUpdate(
      {
        _id: transaction.accountId,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        new: true,
      },
    );

    return this.transactionModel.create(transaction);
  }

  async getAllTransactions() {
    return this.transactionModel.find();
  }

  async updateTransaction(id: string, transaction: TransactionDto) {
    const updatedTransaction = await this.transactionModel.findByIdAndUpdate(
      id,
      transaction,
      {
        new: true,
      },
    );

    if (!updatedTransaction) {
      throw new NotFoundException('No transaction found with the given id');
    }

    return updatedTransaction;
  }

  async deleteTransaction(id: string): Promise<{ _id: Types.ObjectId }> {
    const deletedTransaction = await this.transactionModel.findByIdAndDelete(
      id,
      {
        lean: true,
        select: '_id',
      },
    );

    if (!deletedTransaction) {
      throw new NotFoundException('No transaction found with the given id');
    }

    return deletedTransaction;
  }
}
