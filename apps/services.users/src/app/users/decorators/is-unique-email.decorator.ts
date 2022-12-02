import { registerDecorator, ValidationOptions } from 'class-validator';

import { UniqueEmail as UniqueEmailValidator } from '../validators/unique-email.validator';

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUniqueEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueEmailValidator,
    });
  };
}
