import { IsCNPJ } from '../../../shared/decorators/cnpj.decorator';
import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CompanyCnpjAlreadyExistConstraint } from '../validate/company-cnpj-already-exist.constraint';
import { CompanySocialReasonAlreadyExistConstraint } from '../validate/company-social-reason-already-exist.constraint';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { CompanyAddressDto } from './company-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyUpdateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'ID da Empresa: O campo de ID é obrigátorio.' })
  @IsInt({
    message: 'ID da Empresa: O campo de ID precisa ser um inteiro.',
  })
  id: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Nome da Empresa: O campo "name" não pode ser vázio.',
  })
  @IsString({ message: 'Nome da Empresa: O campo "name" deve ser uma string.' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'O campo Razão social precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo Razão social é obrigátorio.' })
  @Validate(CompanySocialReasonAlreadyExistConstraint, {
    message: 'Já existe uma Empresa com esta Razão Social.',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  socialReason: string;

  @ApiProperty()
  @IsString({ message: 'O campo CPNJ precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo CNPJ é obrigátorio.' })
  @IsCNPJ({ message: 'O campo CNPJ precisa ser válido' })
  @Validate(CompanyCnpjAlreadyExistConstraint, {
    message: 'Já existe uma Empresa com este CNPJ.',
  })
  @MinLength(14, {
    message: 'O campo CNPJ precisa ter pelo menos 14 caracteres.',
  })
  @MaxLength(14, {
    message: 'O campo CNPJ precisa ter pelo menos 14 caracteres.',
  })
  @Matches(/^[0-9]*$/, { message: 'Somente números são permitidos.' })
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'E-mail: O campo do "email" não pode ser vazio.' })
  @IsDefined({ message: 'E-mail: O campo do "email" deve ser válido.' })
  @IsString({ message: 'E-mail: O campo do "email" deve ser uma string.' })
  @IsEmail({}, { message: 'E-mail: O campo "email" deve ser válido.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Telefone: O campo "phone" é obrigátorio.' })
  @IsString({ message: 'Telefone: O campo "phone" deve ser uma string.' })
  @Matches(/^[0-9]*$/, { message: 'Telefone: Somente números são permitidos.' })
  phone: string;

  @ApiProperty({
    type: CompanyAddressDto,
  })
  @IsNotEmpty({ message: 'O campo Endereço é obrigátorio.' })
  @ValidateNested({ each: true })
  @Type(() => CompanyAddressDto)
  address?: CompanyAddressDto;
}
