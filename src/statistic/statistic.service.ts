import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { Model } from 'mongoose';
import {
  CategoriesStatistic,
  CategorizedAmountsUnder,
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
  /*[
    {
        "_id": "66c0dc9f988db91247485508",
        "transactionType": "Income",
        "title": "Some title",
        "categories": "Rent",
        "amount": 3,
        "paymentDate": "2012-01-01T00:00:00.000Z",
        "payee": "25",
        "description": "some description",
        "accountId": "66ba5ec4702f1db2592bf94c",
        "uploadedFiles": []
    },
    {
        "_id": "66c1d261527ef998f25e6342",
        "transactionType": "Expenses",
        "title": "Some title",
        "categories": "House",
        "amount": 85,
        "paymentDate": "2012-02-12T00:00:00.000Z",
        "payee": "Bob",
        "description": "some description",
        "accountId": "66ba5ec4702f1db2592bf94c",
        "uploadedFiles": []
    },*/
  async retrieveMonthlyStatistic(body: RetrieveMonthlyStatisticDto) {
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
        $sort: {
          paymentDate: 1,
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
          month: '$_id',
          total: 1,
          income: 1,
          expenses: 1,
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
