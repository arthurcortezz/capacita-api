/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CompaniesService } from '../companies.service';
import { CompanyInterface } from '../interfaces/company.interface';

let service: CompaniesService;

@ValidatorConstraint({ name: 'CompanyCnpjAlreadyExistConstraint', async: true })
export class CompanyCnpjAlreadyExistConstraint
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CompaniesService);
  }

  async validate(
    cnpj: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    if (cnpj) {
      const company: CompanyInterface = Object.assign(
        validationArguments.object,
      );
      const entity = await service.findByCnpj(cnpj, company);
      return !entity;
    }
  }
}
