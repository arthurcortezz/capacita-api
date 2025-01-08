import { HttpException, HttpStatus, Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { createFilters } from "../../shared/utils/typeorm/create-filters.utils";

import { UserEntity } from "./entities/user.entity";
import { UserCreateDto } from "./dtos/user-create.dto";
import { UserUpdateDto } from "./dtos/user-update.dto";
import { UserInterface } from "./interfaces/user.interface";
import { UserFilterInterface } from "./interfaces/user-filter.interface";
import { PersonTypeEnum } from "./enum/person-type.enum";
import { RolesProtectedEnum } from "../roles/enum/roles.enum";
import { makePassword } from "../../shared/utils/generate-random-password.util";
import { CompanyEntity } from "../companies/entities/company.entity";
import { UserJwtInterface } from "../authentication/interfaces/user-jwt.interface";
import { addFiltersByConsultants, addFiltersByUsers } from "../../shared/utils/add-filters-by-users.util";
import { SortInterface } from "../../shared/interfaces/sort.interface";
import { PaginatorInterface } from "../../shared/interfaces/paginator.interface";
import { createPaginator } from "../../shared/utils/create-paginator.util";
import { createOrder } from "../../shared/utils/create-order.util";
import { ClientProxy } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @Inject("EMAILS_SERVICE")
    private readonly client: ClientProxy,
    private readonly configService: ConfigService
  ) {}

  async findAll(currentUser: UserJwtInterface, filters?: UserFilterInterface): Promise<UserInterface[]> {
    try {
      let where = createFilters(filters);
      where = addFiltersByUsers(where, currentUser);
      return await this.usersRepository.find({
        where,
        order: { name: "ASC" },
        relations: ["role", "company"],
      });
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar os usuários." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllPaginate(
    currentUser: UserJwtInterface,
    filters?: UserFilterInterface,
    sort?: SortInterface,
    paginator?: PaginatorInterface
  ): Promise<{ rows: UserInterface[]; count: number }> {
    try {
      const { skip, take } = createPaginator(paginator);
      const order = createOrder(sort);

      let where = createFilters(filters);
      where = addFiltersByUsers(where, currentUser);

      const [rows, count] = await this.usersRepository.findAndCount({
        where,
        relations: ["role", "company"],
        order,
        skip,
        take,
      });
      return { rows, count };
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar os usuários." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllConsultants(currentUser: UserJwtInterface, filters?: UserFilterInterface): Promise<UserInterface[]> {
    try {
      let where = createFilters(filters);
      where = addFiltersByConsultants(where, currentUser);
      return await this.usersRepository.find({
        where,
        order: { name: "ASC" },
        relations: ["role", "company"],
      });
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar os consultores." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllConsultantsPaginate(
    currentUser: UserJwtInterface,
    filters?: UserFilterInterface,
    sort?: SortInterface,
    paginator?: PaginatorInterface
  ): Promise<{ rows: UserInterface[]; count: number }> {
    try {
      const { skip, take } = createPaginator(paginator);
      const order = createOrder(sort);

      let where = createFilters(filters);
      where = addFiltersByConsultants(where, currentUser);

      const [rows, count] = await this.usersRepository.findAndCount({
        where,
        relations: ["role", "company"],
        order,
        skip,
        take,
      });
      return { rows, count };
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar os consultores." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyUser(id: number, currentUser: UserJwtInterface) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id },
        relations: ["role"],
      });
      this.verifyUserByCurrentUser(user, currentUser);
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({ message: "Não foi possível encontrar o usuário." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number, currentUser: UserJwtInterface): Promise<UserInterface> {
    try {
      return await this.verifyUser(id, currentUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({ message: "Não foi possível encontrar o usuário." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string, data: UserInterface | { id: number }): Promise<UserInterface> {
    try {
      const id = data.id || 0;
      return await this.usersRepository.findOne({
        select: ["email"],
        where: {
          email,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar o usuário." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByIdentificationNumber(identificationNumber: string, data: UserInterface | { id: number }): Promise<UserInterface> {
    try {
      const id = data.id || 0;
      return await this.usersRepository.findOne({
        select: ["identificationNumber"],
        where: {
          identificationNumber,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar o usuário." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(
    data: UserCreateDto,
    currentUser: UserJwtInterface
  ): Promise<{
    user: UserInterface;
    message: string;
  }> {
    try {
      const RolesValidByProfile = {
        [RolesProtectedEnum.ADM_ORG]: [RolesProtectedEnum.CONSULTOR],
        [RolesProtectedEnum.CONSULTOR]: [],
      };

      if (currentUser.role.id !== RolesProtectedEnum.ADM_GERAL && !RolesValidByProfile[currentUser.role.id].includes(data.roleId)) {
        throw new HttpException(
          {
            message: "Usuário não pode ser criado com o perfil de acesso selecionado.",
          },
          HttpStatus.UNAUTHORIZED
        );
      }
      const acceptedAt = new Date();
      acceptedAt.setHours(acceptedAt.getHours() + 3);

      const generatePassword = makePassword(8);

      const cpf = data.cpf;
      const cnpj = data.cnpj;
      delete data.cpf;
      delete data.cnpj;

      const currentCompanyId = currentUser.role.id !== RolesProtectedEnum.ADM_GERAL ? currentUser.company.id : data.companyId;

      const entity = Object.assign(new UserEntity(), {
        ...data,
        identificationNumber: data.personType === PersonTypeEnum.JURIDICA ? cnpj : cpf,
        companyId: data.roleId === RolesProtectedEnum.ADM_GERAL ? null : currentCompanyId,
        acceptedAt: data.hasAgreedTermService ? acceptedAt : null,
        password: data.password ? data.password : generatePassword,
      });
      const userCreated = await this.usersRepository.save(entity);
      const user = await this.usersRepository.findOne({
        where: { id: userCreated.id },
        relations: ["company", "role"],
      });

      if (!data.password) {
        const url = await this.configService.get("APP_FRONTEND_URL");
        await lastValueFrom(
          this.client.emit("send_email", {
            subject: "Capacita - Novo Usuário",
            template: "email-novo-usuario.hbs",
            email: user.email,
            data: {
              password: generatePassword,
              url,
              name: user.name,
              login: user.email,
              currentUser: currentUser.name,
            },
          })
        );
      }

      return {
        user,
        message: "O usuário foi criado com sucesso.",
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException({ message: "Não foi possível criar o usuário." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, data: UserUpdateDto, currentUser: UserJwtInterface): Promise<{ user: UserInterface; message: string }> {
    try {
      await this.verifyUser(id, currentUser);

      const RolesValidByProfile = {
        [RolesProtectedEnum.ADM_ORG]: [RolesProtectedEnum.CONSULTOR],
        [RolesProtectedEnum.CONSULTOR]: [],
      };

      if (currentUser.role.id !== RolesProtectedEnum.ADM_GERAL && !RolesValidByProfile[currentUser.role.id].includes(data.roleId)) {
        throw new HttpException(
          {
            message: "Usuário não pode ser criado com o perfil de acesso selecionado.",
          },
          HttpStatus.UNAUTHORIZED
        );
      }

      let user: UserEntity = Object.assign(new UserEntity(), data);

      if (!data.password) {
        delete user.password;
      } else {
        user.password = await user.updatePassword(data.password);
      }

      const currentCompanyId = currentUser.role.id !== RolesProtectedEnum.ADM_GERAL ? currentUser.company.id : data.companyId;

      const entity = Object.assign(new UserEntity(), {
        ...user,
        id,
        identificationNumber: data.personType === PersonTypeEnum.JURIDICA ? data.cnpj : data.cpf,
        companyId: data.roleId === RolesProtectedEnum.ADM_GERAL ? null : currentCompanyId,
      });
      await this.usersRepository.save({ id, ...entity });

      user = await this.usersRepository.findOne({ where: { id } });
      return {
        user,
        message: "O usuário foi atualizado com sucesso.",
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException({ message: "Não foi possível atualizar o usuário." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number, currentUser: UserJwtInterface): Promise<{ message: string }> {
    try {
      await this.verifyUser(id, currentUser);
      await this.usersRepository.softDelete(id);
      return { message: "O usuário foi removido com sucesso." };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException({ message: "Não foi possível excluir o usuário." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  verifyUserByCurrentUser(user: UserInterface, currentUser: UserJwtInterface): boolean {
    let visible = true;
    if (currentUser.role.id !== RolesProtectedEnum.ADM_GERAL) {
      if (
        [RolesProtectedEnum.ADM_ORG, RolesProtectedEnum.CONSULTOR].includes(currentUser.role.id) &&
        (currentUser.company.id !== user.companyId || (currentUser.company.id === user.companyId && currentUser.role.id > user.roleId))
      ) {
        visible = false;
      }
    }

    if (!visible) {
      throw new HttpException(
        {
          message: "Usuário não possui autorização para realizar essa ação.",
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    return true;
  }
}
