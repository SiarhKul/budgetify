import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileUploadDocument = HydratedDocument<FileUpload>;

@Schema()
export class FileUpload {
  @Prop({ required: true, type: File })
  file: Express.Multer.File;
}

export const FileUploadSchema = SchemaFactory.createForClass(FileUpload);
