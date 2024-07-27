import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type PiggyBankDocument = HydratedDocument<PiggyBank>;

@Schema({ versionKey: false })
export class PiggyBank {
  @Prop({ type: String, required: true, unique: true })
  goal: string;

  @Prop({ type: String, required: true })
  goalAmount: string;

  @Prop({ type: [{ type: ObjectId, ref: 'PiggyBankDeposit' }], default: [] })
  deposits: [{ type: ObjectId; ref: 'PiggyBankDeposit' }];
}

export const PiggyBankSchema = SchemaFactory.createForClass(PiggyBank);
