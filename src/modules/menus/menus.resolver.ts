import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from '../../shared/guards/graphql-auth.guard';
import { Roles } from '../../shared/decorators/role.decorator';

import { MenuInterface } from './interfaces/menu.interface';
import { MenuEntity } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { MenuFiltersInput } from './inputs/menu.input';
import { SortInput } from '../../shared/inputs/sort.input';
import { PaginatorInput } from '../../shared/inputs/paginator.input';
import { MenuPaginateEntity } from './entities/menu.paginate.entity';

@Resolver(() => MenuEntity)
@UseGuards(GraphqlAuthGuard)
export class MenusResolver {
  constructor(private readonly service: MenusService) {}

  @Roles('MENUS_LISTAR')
  @Query(() => MenuPaginateEntity)
  async menus(
    @Args('filters') filters: MenuFiltersInput,
    @Args('sort') sort: SortInput,
    @Args('paginator') paginator: PaginatorInput,
  ): Promise<{ rows: MenuInterface[]; count: number }> {
    return this.service.findAllAPaginate(filters, sort, paginator);
  }
}
