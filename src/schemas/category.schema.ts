import { Prop } from '@nestjs/mongoose';
import { TransactionType } from '../ts/transactons/transactions.enums';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

export class Category {
  @Prop({
    required: true,
    unique: true,
    type: String,
    enum: TransactionType,
  })
  transactionType: TransactionType;
  @Prop({ required: true })
  title: string;
}
