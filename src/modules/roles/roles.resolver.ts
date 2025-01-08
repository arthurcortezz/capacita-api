import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from '../../shared/guards/graphql-auth.guard';
import { Roles } from '../../shared/decorators/role.decorator';

import { RoleEntity } from './entities/role.entity';
import { RolesService } from './roles.service';
import { RoleInterface } from './interfaces/role.interface';
import { RoleFiltersInput } from './inputs/role.input';
import { RolePaginateEntity } from './entities/role.paginate.entity';
import { PaginatorInput } from '../../shared/inputs/paginator.input';
import { SortInput } from '../../shared/inputs/sort.input';
import { RoleIdExistPipe } from './validate/role-id-exist.pipe';

@Resolver(() => RoleEntity)
@UseGuards(GraphqlAuthGuard)
export class RolesResolver {
  constructor(private readonly service: RolesService) {}

  @Roles('ROLES_LISTAR')
  @Query(() => RolePaginateEntity)
  async roles(
    @Args('filters') filters: RoleFiltersInput,
    @Args('sort') sort: SortInput,
    @Args('paginator') paginator: PaginatorInput,
  ): Promise<{ rows: RoleInterface[]; count: number }> {
    return this.service.findAllPaginate(filters, sort, paginator);
  }

  @Roles('ROLES_LISTAR')
  @Query(() => RoleEntity)
  async role(
    @Args('id', ParseIntPipe, RoleIdExistPipe) id: number,
  ): Promise<RoleInterface> {
    return this.service.findOne(id);
  }
}
