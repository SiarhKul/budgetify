import { Categories } from '../transactons/transactions.enums';
import { ObjectId } from 'mongodb';

export interface IInfoPiggyBank {
  _id: ObjectId;
  goal: Categories;
  goalAmount: number;
  sumCom: number;
}
