import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';

import { Match } from '../../../shared/decorators/match.decorator';
import { Transform } from 'class-transformer';

import { PersonTypeEnum } from '../enum/person-type.enum';
import { UserEmailAlreadyExistConstraint } from '../validate/user-email-already-exist.constraint';
import { UserIdentificationNumberAlreadyExistConstraint } from '../validate/user-identification-number-already-exist.constraint';
import { IsTrueConstraint } from '../../../shared/validate/is-true.constraint';
import { CompanyInviteCodeExistConstraint } from '../../companies/validate/company-invite-code-exist.constraint';
import { IsCPF } from '../../../shared/decorators/cpf.decorator';
import { IsCNPJ } from '../../../shared/decorators/cnpj.decorator';

export class UserPublicCreateDto {
  @IsDefined({
    message: 'Nome: O campo do "name" deve ser válido.',
  })
  @IsString({
    message: 'Nome: O campo do "name" deve ser uma string.',
  })
  @IsNotEmpty({
    message: 'Nome: O campo do "name" não pode ser vazio.',
  })
  @MinLength(2, {
    message: 'Nome: O campo do "name" deve possuir no mínimo 2 caracteres.',
  })
  @MaxLength(50, {
    message: 'Nome: O campo do "name" deve possuir no máximo 50 caracteres.',
  })
  name: string;

  @IsNotEmpty({ message: 'E-mail: O campo do "email" não pode ser vazio.' })
  @Validate(UserEmailAlreadyExistConstraint, {
    message: 'E-mail: Já existe um Usuário com este Email.',
  })
  @IsDefined({ message: 'E-mail: O campo do "email" deve ser válido.' })
  @IsString({ message: 'E-mail: O campo do "email" deve ser uma string.' })
  @IsEmail({}, { message: 'E-mail: O campo "email" deve ser válido.' })
  email: string;

  @IsDefined({
    message: 'Tipo Pessoa: O campo de "personType" deve ser válido.',
  })
  @Transform(({ value }) => value.toUpperCase().trim())
  @IsEnum(PersonTypeEnum, {
    message: `Tipo Pessoa: O campo de "personType" deve ser válido (${Object.values(
      PersonTypeEnum,
    ).join(', ')})`,
  })
  personType: string;

  @ValidateIf((obj) => obj.personType === PersonTypeEnum.FISICA)
  @IsDefined({
    message: 'CPF: O campo "cpf" deve ser válido!',
  })
  @IsString({ message: 'CPF: O campo "cpf" deve ser uma string!' })
  @MinLength(11, {
    message: 'CPF: O campo "cpf" precisa ter pelo menos 11 caracteres.',
  })
  @MaxLength(11, {
    message: 'CPF: O campo "cpf" precisa ter pelo menos 11 caracteres.',
  })
  @IsCPF({ message: 'O campo "cpf" precisa ser válido.' })
  @Matches(/^[0-9]*$/, { message: 'CPF: Somente números são permitidos.' })
  @Validate(UserIdentificationNumberAlreadyExistConstraint, {
    message: 'Já existe um Usuário com este CPF.',
  })
  cpf: string;

  @ValidateIf((obj) => obj.personType === PersonTypeEnum.JURIDICA)
  @IsDefined({
    message: 'CNPJ: O campo "cnpj" deve ser válido!',
  })
  @IsString({
    message: 'CNPJ: O campo "cnpj" deve ser uma string!',
  })
  @MinLength(14, {
    message: 'CNPJ: O campo "cnpj" precisa ter pelo menos 14 caracteres.',
  })
  @MaxLength(14, {
    message: 'CNPJ: O campo "cnpj" precisa ter pelo menos 14 caracteres.',
  })
  @IsCNPJ({
    message: 'CNPJ: O campo "cnpj" precisa ser válido.',
  })
  @Matches(/^[0-9]*$/, { message: 'CNPJ: Somente números são permitidos.' })
  @Validate(UserIdentificationNumberAlreadyExistConstraint, {
    message: 'Já existe um Usuário com este CNPJ.',
  })
  cnpj: string;

  @IsNotEmpty({ message: 'Telefone: O campo "phone" é obrigátorio.' })
  @Matches(/^[0-9]*$/, { message: 'Telefone: Somente números são permitidos.' })
  @IsString({ message: 'Telefone: O campo "phone" deve ser uma string.' })
  phone: string;

  @IsDefined({
    message: 'Senha: O campo "password" deve ser válido!',
  })
  @IsString({ message: 'Senha: O campo "password" deve ser uma string.' })
  @IsNotEmpty({ message: 'Senha: O campo "password" não pode ser vázio.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha é muito fraca, por favor utilize uma senha forte.',
  })
  password: string;

  @IsDefined({
    message: 'Confirmação da senha: O campo "confirmPassword" deve ser válido!',
  })
  @IsString({
    message:
      'Confirmação da senha: O campo "confirmPassword" deve ser uma string.',
  })
  @IsNotEmpty({
    message:
      'Confirmação da senha: O campo "confirmPassword" não pode ser vázio.',
  })
  @Match('password', {
    message: 'As senhas não coincidem-se, por favor tente novamente.',
  })
  confirmPassword: string;

  @IsNotEmpty({ message: 'Empresa: O campo "uuid" é obrigátorio.' })
  @IsString({ message: 'Empresa: O campo "uuid" deve ser uma string.' })
  @Validate(CompanyInviteCodeExistConstraint, {
    message: 'Não existe uma Empresa com esse identificador.',
  })
  uuid: string;

  @IsOptional()
  @IsBoolean({
    message:
      'Necessário aceitar o termo de serviço: O campo deve ser um booleano',
  })
  @Validate(IsTrueConstraint, {
    message: 'Necessário aceitar o termo de serviço',
  })
  hasAgreedTermService: boolean;
}
