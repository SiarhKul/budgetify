import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Categories,
  TransactionType,
} from '../ts/transactons/transactions.enums';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ versionKey: false })
export class Transaction {
  @Prop({ type: String, required: true, enum: TransactionType })
  transactionType: TransactionType;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true, enum: Categories })
  categories: Categories;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, required: true })
  paymentDate: Date;

  @Prop({ type: String, required: false })
  payee: string;

  @Prop({ type: String, required: false })
  description: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
