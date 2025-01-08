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

@ValidatorConstraint({
  name: 'CompanySocialReasonAlreadyExistConstraint',
  async: true,
})
export class CompanySocialReasonAlreadyExistConstraint
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CompaniesService);
  }

  async validate(
    socialReason: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    if (socialReason) {
      const company: CompanyInterface = Object.assign(
        validationArguments.object,
      );
      const entity = await service.findBySocialReason(socialReason, company);
      return !entity;
    }
  }
}
