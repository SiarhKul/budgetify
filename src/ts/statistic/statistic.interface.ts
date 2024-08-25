import { ObjectId } from 'mongodb';
import { Categories } from '../transactons/transactions.enums';

export interface CategoriesStatistic {
  _id: ObjectId;
  amount: number;
  category: Categories;
}

export interface CategorizedAmountsUnder
  extends Record<Categories, number | undefined> {
  sum: number;
  totalExpenses: number;
}

export interface IStatisticsByDateRange {
  income: number;
  expenses: number;
  total: number;
  month: string;
  economy: number;
  savingsPercentage: number;
}
