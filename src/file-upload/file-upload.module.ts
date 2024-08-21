import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUpload, FileUploadSchema } from '../schemas/file-upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FileUpload.name,
        schema: FileUploadSchema,
      },
    ]),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
