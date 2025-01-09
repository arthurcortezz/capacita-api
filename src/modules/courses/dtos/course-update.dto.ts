import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsInt, Validate, IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

import { CourseNameAlreadyExistConstraint } from "../validate/course-name-already-exist.constraint";

export class CourseUpdateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Curso: O campo de ID do curso é obrigátorio.",
  })
  @IsInt({
    message: "Curso: O campo de ID do curso precisa ser um inteiro.",
  })
  id: number;

  @ApiProperty()
  @Validate(CourseNameAlreadyExistConstraint, {
    message: "Curso: Já existe um curso com este nome.",
  })
  @IsString({
    message: "Curso: O campo de nome precisa ser uma string.",
  })
  @IsNotEmpty({ message: "Curso: O campo de nome é obrigátorio." })
  @MinLength(3, {
    message: "Curso: O campo de nome precisa ter pelo menos 3 caracteres.",
  })
  @MaxLength(50, {
    message: "Curso: O campo de nome pode ter no máximo 50 caracteres.",
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;
}
