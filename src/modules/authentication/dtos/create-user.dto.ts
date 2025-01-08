import { IsTrueConstraint } from "../../../shared/validate/is-true.constraint";
import { AuthenticationCpfAlreadyExist } from "../validate/authentication-cpf-already-exist.constraint";
import { AuthenticationEmailAlreadyExist } from "../validate/authentication-email-already-exist.constraint";
import { AuthenticationValidateConfirmPassword } from "../validate/authentication-password-match.constraint";
import {
  IsEmail,
  IsString,
  Validate,
  IsNotEmpty,
  IsBoolean,
  IsPhoneNumber,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Validate(AuthenticationCpfAlreadyExist, {
    message: "CPF já cadastrado!",
  })
  cpf: string;

  @Validate(AuthenticationEmailAlreadyExist, {
    message: "Email já cadastrado!",
  })
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: "Email invalido!",
    }
  )
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber("BR", {
    message: "Telefone invalido!",
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Validate(AuthenticationValidateConfirmPassword, {
    message: "Senha e Confirmar senha precisam ser iguais!",
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsBoolean({
    message:
      "Necessário aceitar o termo de serviço: O campo deve ser um booleano",
  })
  @Validate(IsTrueConstraint, {
    message: "Necessário aceitar o termo de serviço",
  })
  agreeTerms: boolean;
}
