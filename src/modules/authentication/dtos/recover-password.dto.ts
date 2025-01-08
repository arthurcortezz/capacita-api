import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverPasswordDto {
  @ApiProperty()
  @IsDefined({ message: 'E-mail: O campo "email" deve ser válido!' })
  @IsEmail({}, { message: 'E-mail: O campo "email" deve ser válido!' })
  @IsNotEmpty({ message: 'E-mail: O campo "email" não pode ser vazio!' })
  email: string;
}
