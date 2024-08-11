import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type MulterFileDocument = HydratedDocument<MulterFile>;
/* {
    fieldname: 'files',
    originalname: 's.png',
    encoding: '7bit',
    mimetype: 'image/png',
    buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 7a 00 00 02 98 08 02 00 00 00 aa ca 1d 12 00 00 00 09 70 48 59 73 00 00 0e c4 00 00 0e c4 01 ... 86732 more bytes>,
    size: 86782
  },
*/
@Schema()
export class MulterFile {
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

export const MulterFileSchema = SchemaFactory.createForClass(MulterFile);
