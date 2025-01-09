/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { CoursesService } from "../courses.service";

let service: CoursesService;

@ValidatorConstraint({ name: "CourseIdExistConstraint", async: true })
export class CourseIdExistConstraint implements ValidatorConstraintInterface, OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CoursesService);
  }

  async validate(courseId: number, validationArguments: ValidationArguments): Promise<boolean> {
    if (courseId) {
      const entity = await service.courseIdExist(courseId);
      return entity ? true : false;
    }
  }
}
