import { Categories } from './transactions.enums';
import { ObjectId } from 'mongodb';

export interface IFinedTransaction {
  _id: ObjectId;
  title: string;
  categories: Categories;
}
