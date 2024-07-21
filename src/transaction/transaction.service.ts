import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { Model } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
  ) {}

  createTransaction(transaction: TransactionDto) {
    const newTransaction = new this.transactionModel(transaction);

    return newTransaction.save();
  }
}
