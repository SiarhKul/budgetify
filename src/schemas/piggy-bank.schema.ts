import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PiggyBankDeposit } from './piggy-bank-deposit.schema';
import { ObjectId } from 'mongodb';

export type PiggyBankDocument = HydratedDocument<PiggyBank>;

@Schema({ versionKey: false })
export class PiggyBank {
  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: true })
  accountId: ObjectId;

  @Prop({ required: true, unique: true })
  goal: string;

  @Prop({ required: true })
  goalAmount: number;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: PiggyBankDeposit.name },
    ],
    required: false,
    default: [],
  })
  deposits?: PiggyBankDeposit[];
}

export const PiggyBankSchema = SchemaFactory.createForClass(PiggyBank);
