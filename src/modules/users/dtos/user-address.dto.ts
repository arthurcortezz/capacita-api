import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { IsCEP } from '../../../shared/decorators/cep.decorator';
export class UserAddressDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Campo Rua é obrigatório.' })
  @IsString({ message: 'O campo Rua precisa ser uma string.' })
  street: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo Número é obrigatório.' })
  @IsString({ message: 'O campo Número precisa ser uma string.' })
  number: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'O campo Complemento precisa ser uma string.' })
  complement: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo Bairro é obrigatório.' })
  @IsString({ message: 'O campo Bairro precisa ser uma string.' })
  neighborhood: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo CEP é obrigatório.' })
  @IsString({ message: 'O campo CEP precisa ser uma string.' })
  @IsCEP({ message: 'O campo CEP precisa ser válido' })
  @Matches(/^[0-9]*$/, { message: 'Somente números são permitidos.' })
  cep: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo cityId é obrigatório.' })
  @IsInt({ message: 'O campo cityId precisa ser um inteiro.' })
  cityId: number;
}
