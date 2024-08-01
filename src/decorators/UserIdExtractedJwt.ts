import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ObjectId } from 'mongodb';
export const UserIdExtractedJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const userIdFromHeader: string = request.headers['authorization'];
    return new ObjectId(userIdFromHeader);
  },
);
