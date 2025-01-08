import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { CitiesService } from './cities.service';
import { CityInterface } from './interfaces/city.interface';
import { CityIdExistPipe } from './pipes/city-id-exist.pipe';
import { FindCity } from '../../shared/docs/cities/find-city.docs';
import { FindAllCities } from 'src/shared/docs/cities/find-all-cities.docs';

@ApiTags('Cidades')
@Controller('cities')
export class CitiesController {
  constructor(private service: CitiesService) {}

  @Get()
  @FindAllCities()
  async findAll(): Promise<CityInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @FindCity()
  async findOne(
    @Param('id', ParseIntPipe, CityIdExistPipe) id: number,
  ): Promise<CityInterface> {
    return await this.service.findOne(id);
  }
}
