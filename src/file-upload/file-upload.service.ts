import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload, FileUploadDocument } from '../schemas/file-upload.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Readable } from 'stream';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectModel(FileUpload.name)
    private readonly fileUploadModel: Model<FileUploadDocument>,
  ) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<ObjectId[]> {
    try {
      const savedFiles = await this.fileUploadModel.insertMany(files);

      return savedFiles.map((file) => file._id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async downloadFile(id: string): Promise<StreamableFile> {
    const file = await this.fileUploadModel.findById(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    const fileStream: Readable = this.bufferToStream(file.buffer);

    return new StreamableFile(fileStream, {
      type: file.mimetype,
      disposition: `attachment; filename="${file.originalname}"`,
    });
  }

  private bufferToStream(buffer: Buffer): Readable {
    const buf: Buffer = Buffer.from(buffer);
    const stream = new Readable();
    stream.push(buf);
    stream.push(null);
    return stream;
  }
}
/* [
  {
    fieldname: 'files',
    originalname: '1.png',
    encoding: '7bit',
    mimetype: 'image/png',
    buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 55 00 00 00 de 08 02 00 00 00 02 6e 04 d6 00 00 00 09 70 48 59 73 00 00 0e c4 00 00 0e c4 01 ... 128922 more bytes>,
    size: 128972
  }
]
*/
