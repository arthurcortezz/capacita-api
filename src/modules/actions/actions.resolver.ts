import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from '../../shared/guards/graphql-auth.guard';
import { Roles } from '../../shared/decorators/role.decorator';

import { ActionEntity } from './entities/action.entity';
import { ActionsService } from './actions.service';
import { ActionInterface } from './interfaces/action.interface';
import { ActionFiltersInput } from './inputs/action.input';
import { ActionPaginateEntity } from './entities/action.paginate.entity';
import { SortInput } from '../../shared/inputs/sort.input';
import { PaginatorInput } from '../../shared/inputs/paginator.input';

@Resolver(() => ActionEntity)
@UseGuards(GraphqlAuthGuard)
export class ActionsResolver {
  constructor(private readonly service: ActionsService) {}

  @Roles('ACTIONS_LISTAR')
  @Query(() => ActionPaginateEntity)
  async actions(
    @Args('filters') filters: ActionFiltersInput,
    @Args('sort') sort: SortInput,
    @Args('paginator') paginator: PaginatorInput,
  ): Promise<{ rows: ActionInterface[]; count: number }> {
    return this.service.findAllAPaginate(filters, sort, paginator);
  }
}
