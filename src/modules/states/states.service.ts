import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StateInterface } from './interfaces/state.interface';
import { StateFilterInterface } from './interfaces/state-filter.interface';
import { StateEntity } from './entities/state.entity';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly repository: Repository<StateEntity>,
  ) {}

  async findAll(filter?: StateFilterInterface): Promise<StateInterface[]> {
    try {
      const where = createFilters(filter);
      return await this.repository.find({ where });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os Estados.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<StateInterface> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o Estado.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
