import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';

import { RoleInterface } from './interfaces/role.interface';
import { RoleEntity } from './entities/role.entity';
import { RoleCreateDto } from './dtos/role-create.dto';
import { RoleUpdateDto } from './dtos/role-update.dto';
import { RoleFilterInterface } from './interfaces/role-filter.interface';
import { RolesProtectedEnum } from './enum/roles.enum';
import { SortInterface } from '../../shared/interfaces/sort.interface';
import { PaginatorInterface } from '../../shared/interfaces/paginator.interface';
import { createPaginator } from '../../shared/utils/create-paginator.util';
import { createOrder } from '../../shared/utils/create-order.util';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  async findAll(filters?: RoleFilterInterface): Promise<RoleInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.rolesRepository.find({ where, order: { name: 'ASC' } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os perfis de acessos.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllPaginate(
    filters?: RoleFilterInterface,
    sort?: SortInterface,
    paginator?: PaginatorInterface,
  ): Promise<{ rows: RoleInterface[]; count: number }> {
    try {
      const { skip, take } = createPaginator(paginator);
      const order = createOrder(sort);

      const where = createFilters(filters);
      const [rows, count] = await this.rolesRepository.findAndCount({
        where,
        order,
        skip,
        take,
      });
      return { rows, count };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os perfis de acessos.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<RoleInterface> {
    try {
      return await this.rolesRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async roleIdExist(roleId: number): Promise<RoleInterface> {
    try {
      return await this.rolesRepository.findOne({
        where: {
          id: roleId,
          deletedAt: null,
        },
        select: ['id'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string, data: RoleInterface): Promise<RoleInterface> {
    try {
      const id = data.id || 0;
      return await this.rolesRepository.findOne({
        select: ['name'],
        where: {
          name,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    data: RoleCreateDto,
  ): Promise<{ role: RoleInterface; message: string }> {
    try {
      const entity = Object.assign(new RoleEntity(), data);
      const role = await this.rolesRepository.save(entity);

      return { role, message: 'O perfil de acesso foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    body: RoleUpdateDto,
  ): Promise<{ role: RoleInterface; message: string }> {
    try {
      const entity = Object.assign(new RoleEntity(), { id, ...body });
      await this.rolesRepository.save({ id, ...entity });

      const role = await this.rolesRepository.findOne({ where: { id } });
      return {
        role,
        message: 'O perfil de acesso foi atualizado com sucesso.',
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const protectedRoles = Object.values(RolesProtectedEnum);

      if (protectedRoles.includes(id)) {
        throw new HttpException(
          {
            message: 'Perfil não pode ser removido!',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.rolesRepository.softDelete(id);
      return { message: 'O perfil de acesso foi removido com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Não foi possível excluir o perfil de acesso.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
