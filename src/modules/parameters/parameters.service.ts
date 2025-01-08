import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';
import { Not, Repository } from 'typeorm';

import { ParameterCreateDto } from './dtos/parameter-create.dto';
import { ParameterUpdateDto } from './dtos/parameter-update.dto';
import { ParameterEntity } from './entities/parameter.entity';
import { ParameterFilterInterface } from './interfaces/parameter-filter.interface';
import { ParameterInterface } from './interfaces/parameter.interface';

import { SortInterface } from '../../shared/interfaces/sort.interface';
import { PaginatorInterface } from '../../shared/interfaces/paginator.interface';
import { createPaginator } from '../../shared/utils/create-paginator.util';
import { createOrder } from '../../shared/utils/create-order.util';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(ParameterEntity)
    private parameterRepository: Repository<ParameterEntity>,
  ) {}

  async findAll(
    filter?: ParameterFilterInterface,
  ): Promise<ParameterInterface[]> {
    try {
      const where = createFilters(filter);
      return await this.parameterRepository.find({ where });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os parâmetros de sistema.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllAPaginate(
    filters?: ParameterFilterInterface,
    sort?: SortInterface,
    paginator?: PaginatorInterface,
  ): Promise<{ rows: ParameterInterface[]; count: number }> {
    try {
      const { skip, take } = createPaginator(paginator);
      const order = createOrder(sort);

      const where = createFilters(filters);

      const [rows, count] = await this.parameterRepository.findAndCount({
        where,
        order,
        skip,
        take,
      });
      return { rows, count };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os parâmetros de sistema.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ParameterInterface> {
    try {
      return await this.parameterRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o parâmetro de sistema.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    body: ParameterCreateDto,
  ): Promise<{ parameter: ParameterInterface; message: string }> {
    try {
      const entity = Object.assign(new ParameterEntity(), body);
      const parameter = await this.parameterRepository.save(entity);

      return {
        parameter,
        message: 'Parâmetro do sistema cadastrado com sucesso!',
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível cadastrar o parâmetro de sistema.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    data: ParameterUpdateDto,
    id: number,
  ): Promise<{ parameter: ParameterInterface; message: string }> {
    try {
      const entity = Object.assign(new ParameterEntity(), { id, ...data });
      const parameter = await this.parameterRepository.save(entity);

      return {
        parameter,
        message: 'Parâmetro de sistema atualizado com sucesso!',
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o parâmetro de sistema.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.parameterRepository.softDelete(id);
      return { message: 'Parâmetro de sistema excluído com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o parâmetro de sistema.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findValidKey(key: string, id = 0): Promise<ParameterInterface> {
    try {
      return await this.parameterRepository.findOne({
        where: {
          key,
          id: Not(id),
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o parâmetro de sistema.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
