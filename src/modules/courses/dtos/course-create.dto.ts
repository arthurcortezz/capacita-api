import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { Validate, IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

import { CourseNameAlreadyExistConstraint } from "../validate/course-name-already-exist.constraint";

export class CourseCreateDto {
  @ApiProperty()
  @Validate(CourseNameAlreadyExistConstraint, {
    message: "Já existe um curso com este nome.",
  })
  @IsString({ message: "O campo de nome precisa ser uma string." })
  @IsNotEmpty({ message: "O campo de nome é obrigátorio." })
  @MinLength(3, {
    message: "O campo de nome precisa ter pelo menos 3 caracteres.",
  })
  @MaxLength(50, {
    message: "O campo de nome pode ter no máximo 50 caracteres.",
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;
}
