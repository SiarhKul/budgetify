import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';
import { FlattenMaps, Model, Types } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import {
  Categories,
  TransactionType,
} from '../ts/transactons/transactions.enums';
import { MoneyAccountService } from '../money-account/money-account.service';
import { FileUploadService } from '../file-upload/file-upload.service';
import { IFinedTransaction } from '../ts/transactons/transactions.interfaces';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,

    private readonly accountService: MoneyAccountService,
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

    const listIds = files.length
      ? await this.fileUploadService.uploadFiles(files)
      : [];

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
  /*[
    {
        "_id": "66b8fdc31c56a534fa023bbc",
        "transactionType": "Income",
        "title": "any",
        "categories": "Salary",
        "amount": 8,
        "paymentDate": "2012-01-01T00:00:00.000Z",
        "payee": "payee2",
        "description": "description2",
        "accountId": "66abf6a97bf3e2f09f4f843b"
    }
]*/
  async findTransactionByName(
    searchTerm: string,
  ): Promise<IFinedTransaction[]> {
    return this.transactionModel
      .find({
        title: { $regex: searchTerm, $options: 'i' },
      })
      .select('_id title categories');
  }
}
