import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ActionsService } from '../actions.service';
import { ActionInterface } from '../interfaces/action.interface';

let service: ActionsService;

@ValidatorConstraint({ name: 'ActionNameAlreadyExistConstraint', async: true })
export class ActionNameAlreadyExistConstraint
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(ActionsService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const data: ActionInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, data);
    return !entity;
  }
}
