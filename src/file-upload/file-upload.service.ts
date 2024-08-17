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
    private readonly fileUploadModel: Model<FileUpload>,
  ) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<ObjectId[]> {
    try {
      const savedFiles = await this.fileUploadModel.insertMany(files);

      return savedFiles.map((file) => file._id);
    } catch (error) {
      throw new BadRequestException(error);
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

  async deleteFile(id: string): Promise<FileUploadDocument> {
    const findByIdAndDelete: FileUploadDocument | null =
      await this.fileUploadModel.findByIdAndDelete(id);

    if (!findByIdAndDelete) {
      throw new NotFoundException('File not found');
    }

    return findByIdAndDelete;
  }
}
