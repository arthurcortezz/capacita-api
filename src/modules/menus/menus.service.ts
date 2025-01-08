import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, Repository } from 'typeorm';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';

import { ActionEntity } from '../actions/entities/action.entity';
import { ActionMenuEntity } from '../actions/entities/action-menu.entity';
import { MenuEntity } from './entities/menu.entity';
import { PrivilegeEntity } from './entities/privilege.entity';

import { MenuInterface } from './interfaces/menu.interface';
import { MenuFilterInterface } from './interfaces/menu-filter.interface';
import { MenuCreateDto } from './dtos/menu-create.dto';
import { MenuUpdateDto } from './dtos/menu-update.dto';
import { ActionsMenuDto } from './dtos/action-menu.dto';
import { SortInterface } from '../../shared/interfaces/sort.interface';
import { PaginatorInterface } from '../../shared/interfaces/paginator.interface';
import { createPaginator } from '../../shared/utils/create-paginator.util';
import { createOrder } from '../../shared/utils/create-order.util';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionsRepository: Repository<ActionEntity>,

    @InjectRepository(ActionMenuEntity)
    private readonly actionsMenusRepository: Repository<ActionMenuEntity>,

    @InjectRepository(MenuEntity)
    private readonly menusRepository: Repository<MenuEntity>,

    @InjectRepository(PrivilegeEntity)
    private readonly privilegesRepository: Repository<PrivilegeEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(filters?: MenuFilterInterface): Promise<MenuInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.menusRepository.find({
        where,
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os menus.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<MenuInterface> {
    try {
      return await this.menusRepository
        .createQueryBuilder('menu')
        .leftJoinAndSelect('menu.actionsMenus', 'actionsMenus')
        .leftJoinAndSelect('actionsMenus.privileges', 'privileges')
        .leftJoinAndSelect('actionsMenus.action', 'action')
        .where('menu.id = :id', { id })
        .orderBy('actionsMenus.id', 'ASC')
        .getOne();
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o menu.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllAPaginate(
    filters?: MenuFilterInterface,
    sort?: SortInterface,
    paginator?: PaginatorInterface,
  ): Promise<{ rows: MenuInterface[]; count: number }> {
    try {
      const { skip, take } = createPaginator(paginator);
      const order = createOrder(sort);

      const where = createFilters(filters);

      const [rows, count] = await this.menusRepository.findAndCount({
        where,
        order,
        skip,
        take,
      });
      return { rows, count };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os menus.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string, data: MenuInterface): Promise<MenuInterface> {
    try {
      const id = data.id || 0;
      return await this.menusRepository.findOne({
        select: ['name'],
        where: {
          name,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o menu.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    data: MenuCreateDto,
  ): Promise<{ menu: MenuInterface; message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const actionsMenus = await this.actionsRepository
        .createQueryBuilder('a')
        .select('id', 'actionId')
        .execute();
      const entity = Object.assign(new MenuEntity(), { ...data, actionsMenus });
      const menu = await this.menusRepository.save(entity);

      await queryRunner.commitTransaction();
      return { menu, message: 'O menu foi criado com sucesso.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        { message: 'Não foi possível criar o menu.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    data: MenuUpdateDto,
  ): Promise<{ menu: MenuInterface; message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { icon, route, menuKey } = data;
      await this.menusRepository.update(id, {
        name: data.name,
        icon,
        route,
        menuKey,
      });
      data.actionsMenus && (await this.syncPrivileges(data.actionsMenus));

      await queryRunner.commitTransaction();
      const menu = await this.menusRepository.findOne({ where: { id } });
      return { menu, message: 'O menu foi atualizado com sucesso.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        { message: 'Não foi possível atualizar o menu.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async syncPrivileges(data: ActionsMenuDto[]): Promise<void> {
    try {
      for (const item of data) {
        const entity = Object.assign(new ActionMenuEntity(), item);
        await this.privilegesRepository.delete({ actionMenuId: entity.id });
        await this.privilegesRepository.insert(entity.privileges);
      }
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o menu.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.menusRepository.delete(id);

      return { message: 'O menu foi removido com sucesso' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível excluir o menu.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
