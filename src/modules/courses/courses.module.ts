import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoursesService } from "./courses.service";
import { CoursesResolver } from "./courses.resolver";
import { CourseEntity } from "./entities/course.entity";
import { CoursesController } from "./courses.controller";
import { LessonEntity } from "../lessons/entities/lesson.entity";
import { CourseIdExistPipe } from "./validate/course-id-exist.pipe";
import { CourseIdExistConstraint } from "./validate/course-id-exist.constraint";
import { CourseNameAlreadyExistConstraint } from "./validate/course-name-already-exist.constraint";

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, LessonEntity])],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesResolver, CourseIdExistPipe, CourseIdExistConstraint, CourseNameAlreadyExistConstraint],
})
export class CoursesModule {}
