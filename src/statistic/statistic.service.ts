import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { Aggregate, Model } from 'mongoose';
import { CategoriesStatistic } from '../ts/statistic/statistic.interface';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  getStatisticByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<CategoriesStatistic[]> {
    return this.transactionModel
      .aggregate([
        {
          $match: {
            paymentDate: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $group: {
            _id: '$categories',
            totalAmount: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            totalAmount: 1,
          },
        },
      ])
      .exec();
  }
}
