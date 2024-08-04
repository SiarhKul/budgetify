import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';
import { Model, Types } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionType } from '../ts/transactons/transactions.enums';
import { Account } from '../schemas/account.schema';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,

    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,

    private readonly accountService: AccountService,
  ) {}

  async createTransaction(
    transaction: TransactionDto,
  ): Promise<TransactionDocument> {
    //todo use subtractOrSumBalance method from accountService
    const amount =
      transaction.transactionType === TransactionType.INCOME
        ? transaction.amount
        : -transaction.amount;

    await this.accountService.subtractOrSumBalance(
      transaction.accountId,
      amount,
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
