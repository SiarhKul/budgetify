import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { Model } from 'mongoose';
import {
  CategoriesStatistic,
  CategorizedAmountsUnder,
} from '../ts/statistic/statistic.interface';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async getStatisticByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<CategorizedAmountsUnder> {
    const selectedTransactionByDate = await this.transactionModel
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
          $sort: {
            paymentDate: 1,
          },
        },
        {
          $project: {
            _id: 1,
            category: '$categories',
            amount: 1,
          },
        },
      ])
      .exec();

    return this.categorizedAmountsUnder(selectedTransactionByDate);
  }

  private categorizedAmountsUnder(
    selectedTransactionByDate: CategoriesStatistic[],
  ): CategorizedAmountsUnder {
    const reduce = <CategorizedAmountsUnder>selectedTransactionByDate.reduce(
      (acc, { amount, category }) => {
        acc.sum += amount;

        if (acc.sum < 200) {
          acc[category] = (acc[category] || 0) + amount;
        }

        return acc;
      },
      { sum: 0 },
    );
    return reduce;
  }
}
