import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}
  getStatisticByDate(startDate: Date, endDate: Date) {
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    return this.transactionModel.find({
      paymentDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  }
}
