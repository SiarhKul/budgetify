import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TransactionType } from '../ts/transactons/transactions.enums';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ versionKey: false })
export class Category {
  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
    enum: TransactionType,
  })
  transactionType: TransactionType;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
