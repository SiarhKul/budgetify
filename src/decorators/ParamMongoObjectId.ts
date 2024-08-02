import { Types } from 'mongoose';
import { BadRequestException, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const ParamMongoObjectId = createParamDecorator(
  (data: 'id', ctx: ExecutionContextHost) => {
    const id = ctx.switchToHttp().getRequest().params.id;

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid MongoDB ObjectId format');
    }
    return id;
  },
);
