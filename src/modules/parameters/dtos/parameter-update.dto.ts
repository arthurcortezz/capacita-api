import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ParameterDescriptionAlreadyExist } from '../validate/description-already-exist.constraint';

export class ParameterUpdateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'O campo de ID do parâmetro do sistema é obrigátorio.',
  })
  @IsInt({
    message: 'O campo de ID do parâmetro do sistema precisa ser um inteiro.',
  })
  id: number;

  @ApiProperty()
  @Validate(ParameterDescriptionAlreadyExist, {
    message:
      'Já existe um parâmetro de sistema registrado com as informações fornecidas. Por favor altere a informação para realizar a operação.',
  })
  @IsNotEmpty({ message: 'Campo chave é obrigatório.' })
  @IsString({ message: 'Campo chave não pode ser vazio.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  key: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo valor é obrigatório.' })
  @IsString({ message: 'Campo valor não pode ser vazio.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  value: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
