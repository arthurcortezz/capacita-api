import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from '../../shared/guards/graphql-auth.guard';
import { Roles } from '../../shared/decorators/role.decorator';

import { UserEntity } from './entities/user.entity';
import { UserPaginateEntity } from './entities/user.paginate.entity';
import { UsersService } from './users.service';
import { UserInterface } from './interfaces/user.interface';
import { UserFiltersInput } from './inputs/user.input';
import { AuthUserGraphQL } from '../../shared/decorators/user.decorator';
import { UserJwtInterface } from '../authentication/interfaces/user-jwt.interface';
import { UserIdExistPipe } from './validate/user-id-exist.pipe';
import { SortInput } from '../../shared/inputs/sort.input';
import { PaginatorInput } from '../../shared/inputs/paginator.input';

@Resolver(() => UserEntity)
@UseGuards(GraphqlAuthGuard)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Roles('USERS_LISTAR')
  @Query(() => UserPaginateEntity)
  async users(
    @AuthUserGraphQL() currentUser: UserJwtInterface,
    @Args('filters') filters: UserFiltersInput,
    @Args('sort') sort: SortInput,
    @Args('paginator') paginator: PaginatorInput,
  ): Promise<{ rows: UserInterface[]; count: number }> {
    return this.service.findAllPaginate(currentUser, filters, sort, paginator);
  }

  @Roles(['USERS_LISTAR', 'CONSULTANTS_LISTAR'])
  @Query(() => UserEntity)
  async user(
    @Args('id', ParseIntPipe, UserIdExistPipe) id: number,
    @AuthUserGraphQL() currentUser: UserJwtInterface,
  ): Promise<UserInterface> {
    return this.service.findOne(id, currentUser);
  }

  @Roles('CONSULTANTS_LISTAR')
  @Query(() => UserPaginateEntity)
  async consultants(
    @AuthUserGraphQL() currentUser: UserJwtInterface,
    @Args('filters') filters: UserFiltersInput,
    @Args('sort') sort: SortInput,
    @Args('paginator') paginator: PaginatorInput,
  ): Promise<{ rows: UserInterface[]; count: number }> {
    return this.service.findAllConsultantsPaginate(
      currentUser,
      filters,
      sort,
      paginator,
    );
  }
}
