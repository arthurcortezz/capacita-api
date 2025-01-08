import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';
import { addFiltersByCompanies } from './utils/add-filters-by-companies.util';

import { CompanyEntity } from './entities/company.entity';
import { CompanyInterface } from './interfaces/company.interface';
import { CompanyFilterInterface } from './interfaces/company-filter.interface';
import { CompanyCreateDto } from './dtos/company-create.dto';
import { CompanyUpdateDto } from './dtos/company-update.dto';
import { CompanyAddressEntity } from './entities/company-address.entity';
import { SortInterface } from '../../shared/interfaces/sort.interface';
import { PaginatorInterface } from '../../shared/interfaces/paginator.interface';
import { createPaginator } from '../../shared/utils/create-paginator.util';
import { UserJwtInterface } from '../authentication/interfaces/user-jwt.interface';
import { RolesProtectedEnum } from '../roles/enum/roles.enum';
import { createOrder } from '../../shared/utils/create-order.util';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly repository: Repository<CompanyEntity>,

    @InjectRepository(CompanyAddressEntity)
    private readonly companyAddressRepository: Repository<CompanyAddressEntity>,
  ) {}

  async findAll(
    currentUser: UserJwtInterface,
    filters?: CompanyFilterInterface,
  ): Promise<CompanyInterface[]> {
    try {
      let where = createFilters(filters);
      where = addFiltersByCompanies(where, currentUser);
      return await this.repository.find({
        where,
        relations: ['address', 'users'],
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as empresas.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllPaginate(
    currentUser: UserJwtInterface,
    filters?: CompanyFilterInterface,
    sort?: SortInterface,
    paginator?: PaginatorInterface,
  ): Promise<{ rows: CompanyInterface[]; count: number }> {
    try {
      const { skip, take } = createPaginator(paginator);
      const order = createOrder(sort);

      let where = createFilters(filters);
      where = addFiltersByCompanies(where, currentUser);
      const [rows, count] = await this.repository.findAndCount({
        where,
        relations: ['address', 'users'],
        order,
        skip,
        take,
      });
      return { rows, count };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar as empresas.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async companyIdExist(companyId: number): Promise<CompanyInterface> {
    try {
      return await this.repository.findOne({
        where: {
          id: companyId,
          deletedAt: null,
        },
        select: ['id'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async companyUuidExist(uuid: string): Promise<CompanyInterface> {
    try {
      return await this.repository.findOne({
        where: {
          uuid,
          deletedAt: null,
        },
        select: ['id'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findBySocialReason(
    socialReason: string,
    company: CompanyInterface,
  ): Promise<CompanyInterface> {
    try {
      const id = company.id || 0;
      return await this.repository.findOne({
        where: {
          socialReason,
          id: Not(id),
          deletedAt: null,
        },
        select: ['socialReason'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCnpj(
    cnpj: string,
    company: CompanyInterface,
  ): Promise<CompanyInterface> {
    try {
      const id = company.id || 0;
      return await this.repository.findOne({
        where: {
          cnpj,
          id: Not(id),
          deletedAt: null,
        },
        select: ['cnpj'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(
    id: number,
    currentUser: UserJwtInterface,
  ): Promise<CompanyInterface> {
    try {
      this.verifyCompanyByCurrentUser(id, currentUser);

      return await this.repository.findOneOrFail({
        where: { id },
        relations: [
          'address',
          'address.city',
          'address.city.state',
          'users',
          'users.role',
        ],
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Não foi possível encontrar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(
    name: string,
    data: CompanyInterface,
  ): Promise<CompanyInterface> {
    try {
      const id = data.id || 0;
      return await this.repository.findOne({
        select: ['name'],
        where: {
          name,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByInviteCode(uuid: string): Promise<CompanyInterface> {
    try {
      return await this.repository.findOneOrFail({
        where: {
          uuid,
        },
        relations: ['address'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    data: CompanyCreateDto,
  ): Promise<{ company: CompanyInterface; message: string }> {
    try {
      const entity = Object.assign(new CompanyEntity(), data);

      const companyCreated = await this.repository.save(entity);
      const company = await this.repository.findOne({
        where: { id: companyCreated.id },
        relations: ['address'],
      });
      return { company, message: 'A empresa foi criada com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    body: CompanyUpdateDto,
    currentUser: UserJwtInterface,
  ): Promise<{ company: CompanyInterface; message: string }> {
    try {
      this.verifyCompanyByCurrentUser(id, currentUser);
      await this.companyAddressRepository.delete({ companyId: id });
      const entity = Object.assign(new CompanyEntity(), body);
      await this.repository.save({ id, ...entity });

      const company = await this.repository.findOne({
        where: { id },
        relations: ['address'],
      });

      return { company, message: 'A empresa foi atualizada com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Não foi possível atualizar a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    id: number,
    currentUser: UserJwtInterface,
  ): Promise<{ message: string }> {
    try {
      this.verifyCompanyByCurrentUser(id, currentUser);
      await this.repository.softDelete(id);
      return { message: 'A empresa foi removida com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Não foi possível excluir a empresa.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  verifyCompanyByCurrentUser(
    id: number,
    currentUser: UserJwtInterface,
  ): boolean {
    if (
      currentUser.role.id !== RolesProtectedEnum.ADM_GERAL &&
      id !== currentUser?.company.id
    ) {
      throw new HttpException(
        { message: 'Usuário não possui autorização para realizar essa ação.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
