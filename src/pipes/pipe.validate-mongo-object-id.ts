import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class PipeValidateMongoObjectId implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log('=>(pipe.validate-mongo-object-id.ts:12) metadata', metadata);
    console.log('=>(pipe.validate-mongo-object-id.ts:12) value', value);
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }
}
