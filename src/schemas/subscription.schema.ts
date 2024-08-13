import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Categories } from '../ts/transactons/transactions.enums';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: String, enum: Categories })
  categories: Categories;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  accountId: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
