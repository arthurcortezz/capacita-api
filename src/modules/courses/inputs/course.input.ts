import { InputType, Field } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType("CourseFiltersInput")
export class CourseFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;
}
