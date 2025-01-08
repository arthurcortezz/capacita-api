import {
  Validate,
  IsString,
  IsInt,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { RoleNameAlreadyExistConstraint } from '../validate/role-name-already-exist.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class RoleUpdateDto {
  @ApiProperty()
  @IsNotEmpty({
    message:
      'Perfil de Acesso: O campo de ID do Perfil de Acesso é obrigátorio.',
  })
  @IsInt({
    message:
      'Perfil de Acesso: O campo de ID do Perfil de Acesso precisa ser um inteiro.',
  })
  id: number;

  @ApiProperty()
  @Validate(RoleNameAlreadyExistConstraint, {
    message: 'Perfil de Acesso: Já existe uma Perfil de Acesso com este nome.',
  })
  @IsString({
    message: 'Perfil de Acesso: O campo de nome precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'Perfil de Acesso: O campo de nome é obrigátorio.' })
  @MinLength(3, {
    message:
      'Perfil de Acesso: O campo de nome precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message:
      'Perfil de Acesso: O campo de nome pode ter no máximo 50 caracteres.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;
}
