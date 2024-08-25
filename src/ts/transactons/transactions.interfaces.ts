import { Categories } from './transactions.enums';
import { ObjectId } from 'mongodb';

export interface IFindTransaction {
  _id: ObjectId;
  title: string;
  categories: Categories;
}
