import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PiggyBank } from './piggy-bank.schema';
import { ObjectId } from 'mongodb';

@Schema({ versionKey: false })
export class PiggyBankDeposit {
  @Prop({ type: String, required: true })
  amountToSave: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: ObjectId, required: true })
  piggyBankId: { type: ObjectId; ref: 'PiggyBank' };
}

export const PiggyBankDepositSchema =
  SchemaFactory.createForClass(PiggyBankDeposit);
