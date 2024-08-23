import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { Model } from 'mongoose';
import {
  CategoriesStatistic,
  CategorizedAmountsUnder,
  IMonthlyStatistic,
} from '../ts/statistic/statistic.interface';
import { TransactionType } from '../ts/transactons/transactions.enums';
import { RetrieveMonthlyStatisticDto } from './dto/retrieve-monthly-statistic.dto';

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

  retrieveMonthlyStatistic(
    body: RetrieveMonthlyStatisticDto,
  ): Promise<IMonthlyStatistic[]> {
    return this.transactionModel.aggregate([
      {
        $match: {
          accountId: body.accountId,
          paymentDate: {
            $gte: new Date(body.startDate),
            $lte: new Date(body.endDate),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: '$paymentDate',
              format: '%B-%Y',
            },
          },
          income: {
            $sum: {
              $cond: {
                if: { $eq: ['$transactionType', TransactionType.INCOME] },
                then: '$amount',
                else: 0,
              },
            },
          },
          expenses: {
            $sum: {
              $cond: {
                if: { $eq: ['$transactionType', TransactionType.EXPENSES] },
                then: '$amount',
                else: 0,
              },
            },
          },
          total: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          income: 1,
          expenses: 1,
          month: '$_id',
          economy: {
            $subtract: ['$income', '$expenses'],
          },
          savingsPercentage: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: [
                      { $subtract: ['$income', '$expenses'] },
                      '$income',
                    ],
                  },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
      {
        $addFields: {
          sortDate: {
            $dateFromString: {
              dateString: { $concat: ['01-', '$month'] },
            },
          },
        },
      },
      {
        $sort: { sortDate: 1 },
      },
      {
        $project: {
          sortDate: 0,
        },
      },
    ]);
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
