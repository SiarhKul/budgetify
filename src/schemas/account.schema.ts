import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Currency } from '../ts/account/account.enum';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, required: false })
  currency: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  userId: Types.ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
