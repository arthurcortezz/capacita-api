import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { RolesService } from '../roles.service';
import { RoleInterface } from '../interfaces/role.interface';

let service: RolesService;

@ValidatorConstraint({ name: 'RoleNameAlreadyExistConstraint', async: true })
export class RoleNameAlreadyExistConstraint
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(RolesService);
  }

  async validate(
    name: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const data: RoleInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, data);
    return !entity;
  }
}
