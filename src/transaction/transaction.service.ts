import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { Model, Types } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  createTransaction(transaction: TransactionDto) {
    return this.transactionModel.create(transaction);
  }

  async getAllTransactions() {
    return this.transactionModel.find();
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
