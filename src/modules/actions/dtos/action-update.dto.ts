import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

import { ActionNameAlreadyExistConstraint } from '../validate/action-name-already-exist.constraint';

export class ActionUpdateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Ação: O campo "id" é obrigatório.' })
  @IsInt({ message: 'Ação: O campo "id" precisa ser um inteiro.' })
  id: number;

  @ApiProperty()
  @Validate(ActionNameAlreadyExistConstraint, {
    message: 'Ação: Já existe uma Ação com este nome.',
  })
  @IsString({ message: 'Ação: O campo "name" precisa ser uma string.' })
  @IsNotEmpty({ message: 'Ação: O campo "name" é obrigatório.' })
  @MinLength(3, {
    message: 'Ação: O campo "name" precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'Ação: O campo "name" pode ter no máximo 50 caracteres.',
  })
  name: string;
}
