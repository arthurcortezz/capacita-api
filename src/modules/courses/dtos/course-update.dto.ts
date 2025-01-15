import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  Validate,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { CourseLessonsDto } from './course-lessons.dto';
import { CourseNameAlreadyExistConstraint } from '../validate/course-name-already-exist.constraint';

export class CourseUpdateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Curso: O campo de ID do curso é obrigátorio.',
  })
  @IsInt({
    message: 'Curso: O campo de ID do curso precisa ser um inteiro.',
  })
  id: number;

  @ApiProperty()
  @Validate(CourseNameAlreadyExistConstraint, {
    message: 'Já existe um curso com este nome.',
  })
  @IsString({ message: 'O campo de nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de nome é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de nome precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'O campo de nome pode ter no máximo 50 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @ApiProperty()
  @IsString({ message: 'O campo de descrição precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de descrição é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de descrição precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(150, {
    message: 'O campo de descrição pode ter no máximo 50 caracteres.',
  })
  description: string;

  @ApiProperty()
  @IsString({ message: 'O campo de duração precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de duração é obrigátorio.' })
  duration: string;

  @ApiProperty()
  @IsString({ message: 'O campo de imagem precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de imagem é obrigátorio.' })
  @MinLength(3, {
    message: 'O campo de imagem precisa ter pelo menos 3 caracteres.',
  })
  image: string;

  @ApiProperty()
  @IsInt({ message: 'O campo de preço precisa ser um número.' })
  @IsNotEmpty({ message: 'O campo de preço é obrigátorio.' })
  value: number;

  @ApiProperty()
  status: string;

  @ApiProperty({
    type: () => CourseLessonsDto,
  })
  @IsOptional()
  lessons?: CourseLessonsDto[];
}
