import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CityEntity } from './entities/city.entity';
import { CityFilterInterface } from './interfaces/city-filter.interface';
import { CityInterface } from './interfaces/city.interface';

import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly repository: Repository<CityEntity>,
  ) {}

  async findAll(filter?: CityFilterInterface): Promise<CityInterface[]> {
    try {
      const where = createFilters(filter);
      return await this.repository.find({ where, relations: ['state'] });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as Cidades.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<CityInterface> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
        relations: ['state'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a Cidade.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
