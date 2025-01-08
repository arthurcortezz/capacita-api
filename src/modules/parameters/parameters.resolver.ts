import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ParameterEntity } from './entities/parameter.entity';
import { ParameterPaginateEntity } from './entities/parameter.paginate.entity';
import { ParametersService } from './parameters.service';
import { ParameterInterface } from './interfaces/parameter.interface';
import { ParameterFiltersInput } from './input/parameter.input';

import { Roles } from '../../shared/decorators/role.decorator';
import { GraphqlAuthGuard } from '../../shared/guards/graphql-auth.guard';
import { HasAgreedTermServiceInterceptor } from '../../shared/interceptors/has-agreed-term-service.interceptor';
import { SortInput } from '../../shared/inputs/sort.input';
import { PaginatorInput } from '../../shared/inputs/paginator.input';

@Resolver(() => ParameterEntity)
@UseGuards(GraphqlAuthGuard)
@UseInterceptors(HasAgreedTermServiceInterceptor)
export class ParametersResolver {
  constructor(private service: ParametersService) {}

  @Roles('PARAMETERS_LISTAR')
  @Query(() => ParameterPaginateEntity)
  async parameters(
    @Args('filters') filters: ParameterFiltersInput,
    @Args('sort') sort: SortInput,
    @Args('paginator') paginator: PaginatorInput,
  ): Promise<{ rows: ParameterInterface[]; count: number }> {
    return this.service.findAllAPaginate(filters, sort, paginator);
  }

  @Roles('PARAMETERS_LISTAR')
  @Query(() => ParameterEntity)
  async parameter(@Args('id') id: number): Promise<ParameterInterface> {
    return this.service.findOne(id);
  }
}
