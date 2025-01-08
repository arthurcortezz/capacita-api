/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ParameterInterface } from '../interfaces/parameter.interface';
import { ParametersService } from '../parameters.service';

let service: ParametersService;
@ValidatorConstraint({ name: 'ParameterDescriptionAlreadyExist', async: true })
export class ParameterDescriptionAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit(): void {
    service = this.moduleRef.get(ParametersService);
  }

  async validate(
    key: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const parameterRequest: ParameterInterface = Object.assign(
      validationArguments.object,
    );
    const entity = await service.findValidKey(key, parameterRequest.id);
    return !entity;
  }
}
