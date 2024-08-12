import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type FileUploadDocument = HydratedDocument<FileUpload>;

@Schema()
export class FileUpload {
  @Prop({ required: true, type: File })
  file: Express.Multer.File;

  @Prop({ required: true })
  transactionId: ObjectId;
}

export const FileUploadSchema = SchemaFactory.createForClass(FileUpload);
