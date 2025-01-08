/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CompaniesService } from '../companies.service';

let service: CompaniesService;

@ValidatorConstraint({ name: 'CompanyInviteCodeExistConstraint', async: true })
export class CompanyInviteCodeExistConstraint
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CompaniesService);
  }

  async validate(
    uuid: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    if (uuid) {
      const entity = await service.companyUuidExist(uuid);
      return entity ? true : false;
    }
  }
}
