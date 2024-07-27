import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type PiggyBankDocument = HydratedDocument<PiggyBank>;

@Schema({ versionKey: false })
export class PiggyBank {
  @Prop({ type: String, required: true, unique: true })
  goal: string;

  @Prop({ type: Number, required: true })
  goalAmount: number;

  @Prop({ type: [{ type: ObjectId, ref: 'PiggyBankDeposit' }], default: [] })
  deposits?: ObjectId[];
}

export const PiggyBankSchema = SchemaFactory.createForClass(PiggyBank);
