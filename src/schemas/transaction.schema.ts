import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Categories,
  TransactionType,
} from '../ts/transactons/transactions.enums';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
import { MulterFile } from './multer-file.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ versionKey: false })
export class Transaction {
  @Prop({ type: String, required: true, enum: TransactionType })
  transactionType: TransactionType;

  @Prop({ required: true })
  title: string;

  @Prop({ type: String, required: true, enum: Categories })
  categories: Categories;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop({ required: false })
  payee?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  accountId: ObjectId;

  @Prop({ required: true, type: [MulterFile] })
  uploadedFiles: MulterFile[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
