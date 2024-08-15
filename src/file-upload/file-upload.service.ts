import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload, FileUploadDocument } from '../schemas/file-upload.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

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

  async downloadFile(id: string) {
    const file = await this.fileUploadModel.findById(id);
    console.log('aaaaaa', file);
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
  },
  {
    fieldname: 'files',
    originalname: 's.png',
    encoding: '7bit',
    mimetype: 'image/png',
    buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 7a 00 00 02 98 08 02 00 00 00 aa ca 1d 12 00 00 00 09 70 48 59 73 00 00 0e c4 00 00 0e c4 01 ... 86732 more bytes>,
    size: 86782
  }
]

*/
