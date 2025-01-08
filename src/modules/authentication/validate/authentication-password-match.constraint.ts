import { CreateUserDto } from "../dtos/create-user.dto";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({
  name: "AuthenticationValidateConfirmPassword",
  async: false,
})
export class AuthenticationValidateConfirmPassword
  implements ValidatorConstraintInterface
{
  validate(password: string, args: ValidationArguments): boolean {
    const dto = args.object as CreateUserDto;

    if (dto.password !== dto.confirmPassword) {
      return false;
    }

    return true;
  }
}
