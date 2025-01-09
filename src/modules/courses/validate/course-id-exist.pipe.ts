import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PipeTransform, Injectable, NotFoundException } from "@nestjs/common";

import { CourseEntity } from "../entities/course.entity";

@Injectable()
export class CourseIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>
  ) {}

  async transform(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException("Curso não encontrado", `Não foi possível encontrar o curso com esse ID: ${id}`);
    }

    return id;
  }
}
