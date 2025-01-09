import { Field, ObjectType } from "@nestjs/graphql";

import { CourseEntity } from "./course.entity";

@ObjectType()
export class CoursePaginateEntity {
  @Field(() => [CourseEntity])
  rows: CourseEntity[];

  @Field()
  count: number;
}
