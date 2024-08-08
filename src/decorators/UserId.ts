import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    console.log();

    const [type, token] = request.headers['authorization'].split(' ') ?? [];
    const { sub: userId } = jwtService.decode(token);

    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException(
        'Invalid MongoDB ObjectId format.Check the header value.',
      );
    }
    if (type !== 'Bearer') {
      throw new BadRequestException('Token is not bearer');
    }

    return userId;
  },
);
