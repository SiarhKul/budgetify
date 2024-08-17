import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';
import { FileUploadDocument } from '../schemas/file-upload.schema';
import { ObjectId } from 'mongodb';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|png/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1024, // 1MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File[],
  ): Promise<ObjectId[]> {
    return this.fileUploadService.uploadFiles(files);
  }

  @Get('download/:id')
  downloadFile(@ParamMongoObjectId() id: string): Promise<StreamableFile> {
    return this.fileUploadService.downloadFile(id);
  }

  @Delete(':id')
  deleteFile(@ParamMongoObjectId() id: string): Promise<FileUploadDocument> {
    return this.fileUploadService.deleteFile(id);
  }
}
