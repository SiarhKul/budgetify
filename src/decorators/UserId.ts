import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Types } from 'mongoose';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    const userIdFromHeader: string = request.headers['authorization'];

    if (!Types.ObjectId.isValid(userIdFromHeader)) {
      throw new BadRequestException(
        'Invalid MongoDB ObjectId format.Check the header value.',
      );
    }

    return userIdFromHeader;
  },
);
