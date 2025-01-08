/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { RolesService } from '../roles.service';

let service: RolesService;

@ValidatorConstraint({ name: 'RoleIdExistConstraint', async: true })
export class RoleIdExistConstraint
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(RolesService);
  }

  async validate(
    roleId: number,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    if (roleId) {
      const entity = await service.roleIdExist(roleId);
      return entity ? true : false;
    }
  }
}
