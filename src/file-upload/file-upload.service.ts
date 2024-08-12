import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload, FileUploadDocument } from '../schemas/file-upload.schema';
import { Model } from 'mongoose';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectModel(FileUpload.name)
    private readonly fileUploadModel: Model<FileUploadDocument>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const savedFile = await this.fileUploadModel.create({ file });

      return savedFile._id.toString();
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }
}
