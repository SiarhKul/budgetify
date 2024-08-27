import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TransactionType } from '../ts/transactons/transactions.enums';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    type: String,
    required: true,
    enum: TransactionType,
  })
  transactionType: string;

  @Prop({ required: true })
  userId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
