import { Args, Query, Resolver } from "@nestjs/graphql";
import { ParseIntPipe, UseGuards } from "@nestjs/common";

import { CoursesService } from "./courses.service";
import { CourseEntity } from "./entities/course.entity";
import { CourseFiltersInput } from "./inputs/course.input";
import { SortInput } from "../../shared/inputs/sort.input";
import { CourseInterface } from "./interfaces/course.interface";
import { Roles } from "../../shared/decorators/role.decorator";
import { CourseIdExistPipe } from "./validate/course-id-exist.pipe";
import { PaginatorInput } from "../../shared/inputs/paginator.input";
import { CoursePaginateEntity } from "./entities/course.paginate.entity";
import { GraphqlAuthGuard } from "../../shared/guards/graphql-auth.guard";

@Resolver(() => CourseEntity)
@UseGuards(GraphqlAuthGuard)
export class CoursesResolver {
  constructor(private readonly service: CoursesService) {}

  @Roles("COURSES_LISTAR")
  @Query(() => CoursePaginateEntity)
  async courses(
    @Args("filters") filters: CourseFiltersInput,
    @Args("sort") sort: SortInput,
    @Args("paginator") paginator: PaginatorInput
  ): Promise<{ rows: CourseInterface[]; count: number }> {
    return this.service.findAllPaginate(filters, sort, paginator);
  }

  @Roles("COURSES_LISTAR")
  @Query(() => CourseEntity)
  async role(@Args("id", ParseIntPipe, CourseIdExistPipe) id: number): Promise<CourseInterface> {
    return this.service.findOne(id);
  }
}
