import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CourseEntity } from './entities/course.entity';
import { CourseCreateDto } from './dtos/course-create.dto';
import { CourseUpdateDto } from './dtos/course-update.dto';
import { CourseInterface } from './interfaces/course.interface';
import { LessonEntity } from '../lessons/entities/lesson.entity';
import { createOrder } from '../../shared/utils/create-order.util';
import { SortInterface } from '../../shared/interfaces/sort.interface';
import { createPaginator } from '../../shared/utils/create-paginator.util';
import { CourseFilterInterface } from './interfaces/course-filter.interface';
import { createFilters } from '../../shared/utils/typeorm/create-filters.utils';
import { PaginatorInterface } from '../../shared/interfaces/paginator.interface';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,

    @InjectRepository(LessonEntity)
    private readonly lessonsRepository: Repository<LessonEntity>
  ) {}

  async findAll(filters?: CourseFilterInterface): Promise<CourseInterface[]> {
    try {
      const where = createFilters(filters);
      return await this.coursesRepository.find({
        where,
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os cursos.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
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
      throw new HttpException(
        { message: 'Não foi possível encontrar os cursos.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<CourseInterface> {
    try {
      return await this.coursesRepository.findOneOrFail({
        where: { id },
        relations: ['lessons'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o curso.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findLesson(id: number): Promise<LessonEntity> {
    console.log('🚀 ~ CoursesService ~ findLesson ~ id:', id);
    try {
      return await this.lessonsRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      console.log('🚀 ~ CoursesService ~ findLesson ~ error:', error);
      throw new HttpException(
        { message: 'Não foi possível encontrar a aula.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async courseIdExist(courseId: number): Promise<CourseInterface> {
    try {
      return await this.coursesRepository.findOne({
        where: {
          id: courseId,
          deletedAt: null,
        },
        select: ['id'],
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o curso.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findByName(
    name: string,
    data: CourseInterface
  ): Promise<CourseInterface> {
    try {
      const id = data.id || 0;
      return await this.coursesRepository.findOne({
        select: ['name'],
        where: {
          name,
          id: Not(id),
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar o curso.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async create(
    data: CourseCreateDto
  ): Promise<{ course: CourseEntity; message: string }> {
    try {
      const entity = Object.assign(new CourseEntity(), data);
      entity.status = 'Ativo';

      const course = await this.coursesRepository.save(entity);

      if (data.lessons && data.lessons.length > 0) {
        const lessons = data.lessons.map((lessonData) => {
          const lesson = new LessonEntity();
          lesson.title = lessonData.title;
          lesson.order = lessonData.order;
          lesson.pdfUrl = lessonData.pdfUrl;
          lesson.course = course;
          return lesson;
        });

        await this.lessonsRepository.save(lessons);
      }

      return { course, message: 'O curso foi criado com sucesso.' };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o curso.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(
    id: number,
    body: CourseUpdateDto
  ): Promise<{ course: CourseInterface; message: string }> {
    try {
      const entity = Object.assign(new CourseEntity(), { id, ...body });

      const course = await this.coursesRepository.findOne({
        where: { id },
        relations: ['lessons'],
      });

      if (course && course.lessons) {
        await this.lessonsRepository.remove(course.lessons);
      }

      if (entity.lessons && entity.lessons.length > 0) {
        const lessons = entity.lessons.map((lessonData) => {
          const lesson = new LessonEntity();
          lesson.title = lessonData.title;
          lesson.order = lessonData.order;
          lesson.pdfUrl = lessonData.pdfUrl;
          lesson.course = course;
          return lesson;
        });

        await this.lessonsRepository.save(lessons);
      }

      delete entity.lessons;
      await this.coursesRepository.save(entity);

      const updatedCourse = await this.coursesRepository.findOne({
        where: { id },
        relations: ['lessons'],
      });

      return {
        course: updatedCourse,
        message: 'O curso foi atualizado com sucesso.',
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível atualizar o curso.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.coursesRepository.softDelete(id);
      return { message: 'O curso foi removido com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Não foi possível excluir o curso.' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
