import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PrivilegeDto } from './privilege.dto';

export class ActionsMenuDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Informar ID da relação ação/menu.' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informar ID da ação.' })
  actionId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informar ID do menu.' })
  menuId: number;

  @ApiProperty()
  @IsOptional()
  @IsArray({ message: 'Array inválido' })
  @ValidateNested()
  @Type(() => PrivilegeDto)
  privileges: PrivilegeDto[];
}
