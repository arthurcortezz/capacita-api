import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';

import { ActionInterface } from './interfaces/action.interface';
import { ActionEntity } from './entities/action.entity';
import { ActionCreateDto } from './dtos/action-create.dto';
import { ActionUpdateDto } from './dtos/action-update.dto';
import { ActionFilterInterface } from './interfaces/action-filter.interface';
import { SortInterface } from '../../shared/interfaces/sort.interface';
import { PaginatorInterface } from '../../shared/interfaces/paginator.interface';
import { createPaginator } from '../../shared/utils/create-paginator.util';
import { createOrder } from '../../shared/utils/create-order.util';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionsRepository: Repository<ActionEntity>,
  ) {}

  async findAll(filters?: ActionFilterInterface): Promise<ActionInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.actionsRepository.find({
        where,
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as ações.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ActionInterface> {
    try {
      return await this.actionsRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllAPaginate(
    filters?: ActionFilterInterface,
    sort?: SortInterface,
    paginator?: PaginatorInterface,
  ): Promise<{ rows: ActionInterface[]; count: number }> {
    try {
      const { skip, take } = createPaginator(paginator);
      const order = createOrder(sort);

      const where = createFilters(filters);

      const [rows, count] = await this.actionsRepository.findAndCount({
        where,
        order,
        skip,
        take,
      });
      return { rows, count };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as ações.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(
    name: string,
    data: ActionInterface,
  ): Promise<ActionInterface> {
    try {
      const id = data.id || 0;
      return await this.actionsRepository.findOne({
        select: ['name'],
        where: {
          name,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    data: ActionCreateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    try {
      const entity = Object.assign(new ActionEntity(), data);
      const action = await this.actionsRepository.save(entity);

      return { action, message: 'A ação foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    body: ActionUpdateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    try {
      const entity = Object.assign(new ActionEntity(), { id, ...body });
      await this.actionsRepository.save({ id, ...entity });

      const action = await this.actionsRepository.findOne({ where: { id } });
      return {
        action,
        message: 'A ação foi atualizada com sucesso.',
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.actionsRepository.softDelete(id);
      return { message: 'A ação foi removida com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir a ação.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
