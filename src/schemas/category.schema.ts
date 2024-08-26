import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TransactionType } from '../ts/transactons/transactions.enums';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    required: true,
    type: String,
    enum: TransactionType,
  })
  transactionType: TransactionType;

  @Prop({ required: true })
  userId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
