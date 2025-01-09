import { ModuleRef } from "@nestjs/core";
import { OnModuleInit } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

import { CoursesService } from "../courses.service";
import { CourseInterface } from "../interfaces/course.interface";

let service: CoursesService;

@ValidatorConstraint({ name: "CourseNameAlreadyExistConstraint", async: true })
export class CourseNameAlreadyExistConstraint implements ValidatorConstraintInterface, OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(CoursesService);
  }

  async validate(name: string, validationArguments: ValidationArguments): Promise<boolean> {
    const data: CourseInterface = Object.assign(validationArguments.object);
    const entity = await service.findByName(name, data);
    return !entity;
  }
}
