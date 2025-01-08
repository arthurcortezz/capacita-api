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

@ValidatorConstraint({ name: 'CompanyIdExistConstraint', async: true })
export class CompanyIdExistConstraint
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CompaniesService);
  }

  async validate(
    companyId: number,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    if (companyId) {
      const entity = await service.companyIdExist(companyId);
      return entity ? true : false;
    }
  }
}
