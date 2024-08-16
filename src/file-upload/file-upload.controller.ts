import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ParamMongoObjectId } from '../decorators/ParamMongoObjectId';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File[]) {
    return this.fileUploadService.uploadFiles(file);
  }

  @Get('download/:id')
  downloadFile(@ParamMongoObjectId() id: string) {
    return this.fileUploadService.downloadFile(id);
  }
}
