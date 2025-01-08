import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TermServiceDto {
  @IsNotEmpty({ message: 'Campo nome é obrigatório.' })
  @IsString({ message: 'Campo nome não pode ser vazio.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsNotEmpty({ message: 'Campo descrição é obrigatório.' })
  @IsString({ message: 'Campo descrição não pode ser vazio.' })
  description: string;
}
