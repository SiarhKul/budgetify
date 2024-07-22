import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export function IsTypeOfDate() {
  return applyDecorators(
    Transform(({ value }) => new Date(value)),
    IsDate(),
  );
}
