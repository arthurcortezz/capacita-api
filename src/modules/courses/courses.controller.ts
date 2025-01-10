import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Get, Put, Post, Body, Param, Delete, UseGuards, Controller, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { CoursesService } from "./courses.service";
import { CourseCreateDto } from "./dtos/course-create.dto";
import { CourseUpdateDto } from "./dtos/course-update.dto";
import { CourseInterface } from "./interfaces/course.interface";
import { Roles } from "../../shared/decorators/role.decorator";
import { CourseIdExistPipe } from "./validate/course-id-exist.pipe";
import { JWTAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { FindRole } from "../../shared/docs/roles/find-role.docs";
import { RemoveRole } from "../../shared/docs/roles/remove-role.docs";
import { CreateRole } from "../../shared/docs/roles/create-role.docs";
import { UpdateRole } from "../../shared/docs/roles/update-role.docs";
import { FindAllRoles } from "../../shared/docs/roles/find-all-roles.docs";
import { HasAgreedTermServiceInterceptor } from "../../shared/interceptors/has-agreed-term-service.interceptor";

@ApiTags("Cursos")
@ApiBearerAuth()
@Controller("courses")
@UseGuards(JWTAuthGuard)
@UseInterceptors(HasAgreedTermServiceInterceptor)
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get()
  @FindAllRoles()
  @Roles("COURSES_LISTAR")
  async getAll(): Promise<CourseInterface[]> {
    return this.service.findAll();
  }

  @Get(":id")
  @FindRole()
  @Roles("COURSES_LISTAR")
  async findOne(@Param("id", ParseIntPipe, CourseIdExistPipe) id: number): Promise<CourseInterface> {
    return this.service.findOne(id);
  }

  @Post()
  @CreateRole()
  @Roles("COURSES_CRIAR")
  async create(@Body() data: CourseCreateDto): Promise<{ course: CourseInterface; message: string }> {
    return this.service.create(data);
  }

  @Put(":id")
  @UpdateRole()
  @Roles("COURSES_MODIFICAR")
  async update(
    @Param("id", ParseIntPipe, CourseIdExistPipe) id: number,
    @Body() data: CourseUpdateDto
  ): Promise<{ role: CourseInterface; message: string }> {
    return this.service.update(id, data);
  }

  @Delete(":id")
  @RemoveRole()
  @Roles("COURSES_REMOVER")
  async delete(@Param("id", ParseIntPipe, CourseIdExistPipe) id: number): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
