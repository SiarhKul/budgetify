import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Currency } from '../ts/account/account.enum';
import { ObjectId } from 'mongodb';

export type MoneyAccountDocument = HydratedDocument<MoneyAccount>;

@Schema()
export class MoneyAccount {
  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: Currency, required: false })
  currency: Currency;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  balance: number;
}

export const MoneyAccountSchema = SchemaFactory.createForClass(MoneyAccount);
