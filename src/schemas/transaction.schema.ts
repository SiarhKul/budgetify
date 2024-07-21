import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Categories, TransactionType } from '../enums/common';

@Schema({ versionKey: false })
export class Transaction {
  @Prop({ required: true, enum: TransactionType })
  transactionType: TransactionType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: Categories })
  categories: Categories;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop()
  payee: string;

  @Prop()
  description: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
