import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { createFilters } from "../../shared/utils/typeorm/create-filters.utils";

import { CourseEntity } from "./entities/course.entity";
import { CourseCreateDto } from "./dtos/course-create.dto";
import { CourseUpdateDto } from "./dtos/course-update.dto";
import { RolesProtectedEnum } from "./enum/courses.enum";
import { CourseInterface } from "./interfaces/course.interface";
import { createOrder } from "../../shared/utils/create-order.util";
import { SortInterface } from "../../shared/interfaces/sort.interface";
import { CourseFilterInterface } from "./interfaces/course-filter.interface";
import { createPaginator } from "../../shared/utils/create-paginator.util";
import { PaginatorInterface } from "../../shared/interfaces/paginator.interface";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>
  ) {}

  async findAll(filters?: CourseFilterInterface): Promise<CourseInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.coursesRepository.find({ where, order: { name: "ASC" } });
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar os cursos." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllPaginate(
    filters?: CourseFilterInterface,
    sort?: SortInterface,
    paginator?: PaginatorInterface
  ): Promise<{ rows: CourseInterface[]; count: number }> {
    try {
      const { skip, take } = createPaginator(paginator);
      const order = createOrder(sort);

      const where = createFilters(filters);
      const [rows, count] = await this.coursesRepository.findAndCount({
        where,
        order,
        skip,
        take,
      });
      return { rows, count };
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar os cursos." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<CourseInterface> {
    try {
      return await this.coursesRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar o curso." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async courseIdExist(courseId: number): Promise<CourseInterface> {
    try {
      return await this.coursesRepository.findOne({
        where: {
          id: courseId,
          deletedAt: null,
        },
        select: ["id"],
      });
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar o curso." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByName(name: string, data: CourseInterface): Promise<CourseInterface> {
    try {
      const id = data.id || 0;
      return await this.coursesRepository.findOne({
        select: ["name"],
        where: {
          name,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException({ message: "Não foi possível encontrar o curso." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: CourseCreateDto): Promise<{ course: CourseInterface; message: string }> {
    try {
      const entity = Object.assign(new CourseEntity(), data);
      entity.status = "Ativo";
      const course = await this.coursesRepository.save(entity);

      return { course, message: "O curso foi criado com sucesso." };
    } catch (error) {
      throw new HttpException({ message: "Não foi possível criar o curso." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, body: CourseUpdateDto): Promise<{ role: CourseInterface; message: string }> {
    try {
      const entity = Object.assign(new CourseEntity(), { id, ...body });
      await this.coursesRepository.save({ id, ...entity });

      const role = await this.coursesRepository.findOne({ where: { id } });
      return {
        role,
        message: "O curso foi atualizado com sucesso.",
      };
    } catch (error) {
      throw new HttpException({ message: "Não foi possível atualizar o curso." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const protectedRoles = Object.values(RolesProtectedEnum);

      if (protectedRoles.includes(id)) {
        throw new HttpException(
          {
            message: "Perfil não pode ser removido!",
          },
          HttpStatus.BAD_REQUEST
        );
      }

      await this.coursesRepository.softDelete(id);
      return { message: "O curso foi removido com sucesso." };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({ message: "Não foi possível excluir o curso." }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
