import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';
import { FlattenMaps, Model, Types } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionType } from '../ts/transactons/transactions.enums';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,

    private readonly accountService: AccountService,
  ) {}

  async createTransaction(
    transaction: TransactionDto,
    files: Express.Multer.File[],
  ): Promise<TransactionDocument> {
    const amount: number =
      transaction.transactionType === TransactionType.INCOME
        ? transaction.amount
        : -transaction.amount;

    await this.accountService.subtractOrSumBalance(
      transaction.accountId,
      amount,
    );

    const transactionWithFiles: Transaction = {
      ...transaction,
      uploadedFiles: files,
    };

    return await this.transactionModel.create(transactionWithFiles);
  }

  async getAllTransactions(): Promise<TransactionDocument[]> {
    return this.transactionModel.find();
  }

  async updateTransaction(
    id: string,
    transaction: TransactionDto,
  ): Promise<TransactionDocument> {
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

  async deleteTransaction(
    id: string,
  ): Promise<FlattenMaps<Transaction> & { _id: Types.ObjectId }> {
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
