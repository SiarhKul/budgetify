import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { Model } from 'mongoose';
import {
  CategoriesStatistic,
  CategorizedAmountsUnder,
} from '../ts/statistic/statistic.interface';
import { TransactionType } from '../ts/transactons/transactions.enums';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async getStatisticByDate(
    startDate: Date,
    endDate: Date,
    totalExpenses: number,
    accountId: string,
  ): Promise<CategorizedAmountsUnder> {
    const selectedTransactionByDate: CategoriesStatistic[] =
      await this.transactionModel.aggregate([
        {
          $match: {
            transactionType: TransactionType.EXPENSES,
            accountId: accountId,
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
            category: { $toLower: '$categories' },
            amount: 1,
          },
        },
      ]);

    return this.categorizedAmountsUnder(
      selectedTransactionByDate,
      totalExpenses,
    );
  }

  private categorizedAmountsUnder(
    selectedTransactionByDate: CategoriesStatistic[],
    totalExpenses: number,
  ): CategorizedAmountsUnder {
    const result = { sum: 0, totalExpenses };

    for (const { amount, category } of selectedTransactionByDate) {
      result.sum += amount;

      if (result.sum >= totalExpenses) {
        result.sum = result.sum - amount;
        break;
      }

      result[category] = (result[category] || 0) + amount;
    }

    return <CategorizedAmountsUnder>result;
  }
}
