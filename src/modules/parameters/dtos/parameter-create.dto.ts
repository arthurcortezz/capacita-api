import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { ParameterDescriptionAlreadyExist } from '../validate/description-already-exist.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class ParameterCreateDto {
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
