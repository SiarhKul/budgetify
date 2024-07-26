import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class PiggyBank {
  @Prop({ type: String, required: true })
  goal: string;

  @Prop({ type: String, required: true })
  goalAmount: string;
}

export const PiggyBankSchema = SchemaFactory.createForClass(PiggyBank);
