import { ObjectId } from 'mongodb';
import { Categories } from '../transactons/transactions.enums';

export interface CategoriesStatistic {
  _id: ObjectId;
  amount: number;
  category: string;
}

export interface CategorizedAmountsUnder
  extends Record<Categories, number | undefined> {
  sum: number;
}
