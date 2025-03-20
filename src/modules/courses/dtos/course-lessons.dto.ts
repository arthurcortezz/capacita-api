import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CourseLessonsDto {
  @ApiProperty()
  @IsString({ message: 'O título precisa ser uma string.' })
  @IsNotEmpty({ message: 'O título da aula é obrigatório.' })
  title: string;

  @ApiProperty()
  @IsString({ message: 'O tipo precisa ser uma string.' })
  @IsNotEmpty({ message: 'O tipo da aula é obrigatório.' })
  type: string;

  @ApiProperty()
  @IsString({ message: 'O conteúdo precisa ser uma string.' })
  @IsNotEmpty({ message: 'O conteúdo da aula é obrigatório.' })
  pdfUrl: string;

  @ApiProperty()
  @IsInt({ message: 'A ordem precisa ser um número.' })
  @IsNotEmpty({ message: 'A ordem da aula é obrigatório.' })
  order: number;

  @ApiProperty()
  @IsInt({ message: 'O ID do curso precisa ser um número.' })
  @IsNotEmpty({ message: 'O ID do curso é obrigatório.' })
  courseId: number;
}
