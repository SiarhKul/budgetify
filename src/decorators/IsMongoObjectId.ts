import { registerDecorator, ValidationOptions } from 'class-validator';
import { ObjectId } from 'mongodb';

export function IsMongoObjectId(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsMongoObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return ObjectId.isValid(value);
        },
        defaultMessage() {
          return 'Invalid MongoDB ObjectId format';
        },
      },
    });
  };
}
