import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { CompanyIdExistPipe } from './pipes/company-id-exist.pipe';
import { CompanyCnpjAlreadyExistConstraint } from './validate/company-cnpj-already-exist.constraint';
import { CompanyIdExistConstraint } from './validate/company-id-exist.constraint';
import { CompanySocialReasonAlreadyExistConstraint } from './validate/company-social-reason-already-exist.constraint';
import { CompanyAddressEntity } from './entities/company-address.entity';
import { CompanyInviteCodeExistConstraint } from './validate/company-invite-code-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, CompanyAddressEntity])],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    CompaniesResolver,
    CompanyIdExistPipe,
    CompanyCnpjAlreadyExistConstraint,
    CompanyIdExistConstraint,
    CompanySocialReasonAlreadyExistConstraint,
    CompanyInviteCodeExistConstraint,
  ],
})
export class CompaniesModule {}
