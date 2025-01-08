import { ParseIntPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { StatesService } from './states.service';
import { StateFiltersInput } from './input/state.input';
import { StateInterface } from './interfaces/state.interface';
import { StateEntity } from './entities/state.entity';
import { StateIdExistPipe } from './pipes/state-id-exist.pipe';

@Resolver(() => StateEntity)
export class StatesResolver {
  constructor(private service: StatesService) {}

  @Query(() => [StateEntity])
  async states(
    @Args('filters') filters: StateFiltersInput,
  ): Promise<StateInterface[]> {
    return this.service.findAll(filters);
  }

  @Query(() => StateEntity)
  async state(
    @Args('id', ParseIntPipe, StateIdExistPipe) id: number,
  ): Promise<StateInterface> {
    return this.service.findOne(id);
  }
}
