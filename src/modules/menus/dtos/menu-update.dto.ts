import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

import { MenuNameAlreadyExistConstraint } from '../validate/menu-name-already-exist.constraint';
import { ActionsMenuDto } from './action-menu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MenuUpdateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Menu: O campo "id" é obrigatório.' })
  @IsInt({ message: 'Menu: O campo "id" precisa ser um inteiro.' })
  id: number;

  @ApiProperty()
  @Validate(MenuNameAlreadyExistConstraint, {
    message: 'Nome: Já existe um Menu com este nome.',
  })
  @IsString({
    message: 'Nome: O campo do "menu" precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'Nome: O campo do "menu" é obrigatório.' })
  @MinLength(3, {
    message: 'Nome: O campo do "menu" precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'Nome: O campo do "menu" pode ter no máximo 50 caracteres.',
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'Rota: O campo "route" precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'Rota: O campo "route" é obrigatório.' })
  @MinLength(3, {
    message: 'Rota: O campo "route" precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'Rota: O campo "route" pode ter no máximo 50 caracteres.',
  })
  route: string;

  @ApiProperty()
  @IsString({ message: 'Ícone: O campo "icon" precisa ser uma string.' })
  @IsNotEmpty({ message: 'Ícone: O campo "icon" é obrigatório.' })
  @MinLength(3, {
    message: 'Ícone: O campo "icon" precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'Ícone: O campo "icon" pode ter no máximo 50 caracteres.',
  })
  icon: string;

  @ApiProperty()
  @IsString({
    message: 'Chave do acesso: O campo "menuKey" precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'Chave do acesso: O campo "menuKey" é obrigatório.' })
  @MinLength(3, {
    message:
      'Chave do acesso: O campo "menuKey" precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message:
      'Chave do acesso: O campo "menuKey" pode ter no máximo 50 caracteres.',
  })
  menuKey: string;

  @ApiProperty({
    type: ActionsMenuDto,
  })
  @IsOptional()
  actionsMenus?: ActionsMenuDto[];
}
