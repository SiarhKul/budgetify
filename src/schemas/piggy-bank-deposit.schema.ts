import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type PiggyBankDepositDocument = HydratedDocument<PiggyBankDeposit>;

@Schema({ versionKey: false })
export class PiggyBankDeposit {
  @Prop({ required: true })
  piggyBankId: ObjectId;

  @Prop({ required: true })
  amountToSave: number;

  @Prop({ required: true })
  date: Date;
}

export const PiggyBankDepositSchema =
  SchemaFactory.createForClass(PiggyBankDeposit);
