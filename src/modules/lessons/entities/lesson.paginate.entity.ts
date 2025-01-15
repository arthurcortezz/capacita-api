import { Field, ObjectType } from "@nestjs/graphql";

import { LessonEntity } from "./lesson.entity";

@ObjectType()
export class CoursePaginateEntity {
  @Field(() => [LessonEntity])
  rows: LessonEntity[];

  @Field()
  count: number;
}
