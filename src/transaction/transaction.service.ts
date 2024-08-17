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
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    private readonly accountService: AccountService,
    private readonly fileUploadService: FileUploadService,
  ) {}

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

    const listIds = await this.fileUploadService.uploadFiles(files);

    return await this.transactionModel.create({
      ...transaction,
      uploadedFiles: listIds,
    });
  }

  async getTransactionById(id: string): Promise<TransactionDocument> {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('uploadedFiles', '-buffer -encoding');

    if (!transaction) {
      throw new NotFoundException('No transaction found with the given id');
    }

    return transaction;
  }
}
