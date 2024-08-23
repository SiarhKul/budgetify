import { Categories } from './transactions.enums';

export interface IFinedTransaction {
  _id: string;
  title: string;
  categories: Categories;
}
