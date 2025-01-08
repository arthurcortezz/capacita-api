import { ParseIntPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CitiesService } from './cities.service';
import { CityFiltersInput } from './input/city.input';
import { CityInterface } from './interfaces/city.interface';
import { CityEntity } from './entities/city.entity';
import { CityIdExistPipe } from './pipes/city-id-exist.pipe';

@Resolver(() => CityEntity)
export class CitiesResolver {
  constructor(private service: CitiesService) {}

  @Query(() => [CityEntity])
  async cities(
    @Args('filters') filters: CityFiltersInput,
  ): Promise<CityInterface[]> {
    return this.service.findAll(filters);
  }

  @Query(() => CityEntity)
  async city(
    @Args('id', ParseIntPipe, CityIdExistPipe) id: number,
  ): Promise<CityInterface> {
    return this.service.findOne(id);
  }
}
