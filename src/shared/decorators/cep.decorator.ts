/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cepValidator', async: false })
export class CepValidatorConstraint implements ValidatorConstraintInterface {
  validate(cep: string, args: ValidationArguments) {
    if (!cep) return false;

    cep = cep.replace(/\D/g, '');

    return cep.length === 8;
  }

  defaultMessage(args: ValidationArguments) {
    return 'CEP inválido';
  }
}

export function IsCEP(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CepValidatorConstraint,
    });
  };
}
