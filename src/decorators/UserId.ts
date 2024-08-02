import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const userIdFromHeader: string = request.headers['authorization'];

    if (!Types.ObjectId.isValid(userIdFromHeader)) {
      throw new BadRequestException('Invalid MongoDB ObjectId format');
    }

    return new ObjectId(userIdFromHeader);
  },
);
