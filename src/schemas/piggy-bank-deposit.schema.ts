import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type PiggyBankDepositDocument = HydratedDocument<PiggyBankDeposit>;

@Schema({ versionKey: false })
export class PiggyBankDeposit {
  @Prop({ type: ObjectId, required: true })
  piggyBankId: ObjectId;

  @Prop({ type: Number, required: true })
  amountToSave: number;

  @Prop({ type: Date, required: true })
  date: Date;
}

export const PiggyBankDepositSchema =
  SchemaFactory.createForClass(PiggyBankDeposit);
