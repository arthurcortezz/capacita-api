/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cnpjValidator', async: false })
export class CnpjValidatorConstraint implements ValidatorConstraintInterface {
  validate(cnpj: string, args: ValidationArguments) {
    if (!cnpj) return false;

    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) return false;

    let sum = 0;
    let length = cnpj.length - 2;
    let digits = cnpj.substring(length);
    let pos = 5;

    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj[i]) * pos;
      pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(0))) return false;

    sum = 0;
    length = length + 1;
    digits = cnpj.substring(length);
    pos = 6;

    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj[i]) * pos;
      pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(0))) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'CNPJ inválido';
  }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CnpjValidatorConstraint,
    });
  };
}
