import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from '../../shared/guards/graphql-auth.guard';
import { AuthUserGraphQL } from '../../shared/decorators/user.decorator';
import { Roles } from '../../shared/decorators/role.decorator';

import { CompanyEntity } from './entities/company.entity';
import { CompanyInterface } from './interfaces/company.interface';
import { CompanyFiltersInput } from './inputs/company.input';
import { CompaniesService } from './companies.service';
import { CompanyIdExistPipe } from './pipes/company-id-exist.pipe';
import { SortInput } from '../../shared/inputs/sort.input';
import { PaginatorInput } from '../../shared/inputs/paginator.input';
import { CompanyPaginateEntity } from './entities/company.paginate.entity';
import { UserJwtInterface } from '../authentication/interfaces/user-jwt.interface';

@Resolver(() => CompanyEntity)
@UseGuards(GraphqlAuthGuard)
export class CompaniesResolver {
  constructor(private readonly service: CompaniesService) {}

  @Roles('COMPANIES_LISTAR')
  @Query(() => CompanyPaginateEntity)
  async companies(
    @AuthUserGraphQL() currentUser: UserJwtInterface,
    @Args('filters') filters: CompanyFiltersInput,
    @Args('sort') sort: SortInput,
    @Args('paginator') paginator: PaginatorInput,
  ): Promise<{ rows: CompanyInterface[]; count: number }> {
    return this.service.findAllPaginate(currentUser, filters, sort, paginator);
  }

  @Roles('COMPANIES_LISTAR')
  @Query(() => CompanyEntity)
  async company(
    @Args('id', ParseIntPipe, CompanyIdExistPipe) id: number,
    @AuthUserGraphQL() currentUser: UserJwtInterface,
  ): Promise<CompanyInterface> {
    return this.service.findOne(id, currentUser);
  }
}
