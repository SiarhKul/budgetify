import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileUploadDocument = HydratedDocument<FileUpload>;

@Schema()
export class FileUpload {
  @Prop({ required: true })
  fieldname: string;

  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  encoding: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  buffer: Buffer;

  @Prop({ required: false })
  destination?: string;

  @Prop({ required: false })
  filename?: string;

  @Prop({ required: false })
  path?: string;
}

export const FileUploadSchema = SchemaFactory.createForClass(FileUpload);
