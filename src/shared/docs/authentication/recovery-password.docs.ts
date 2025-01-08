import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function RecoverPassword() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Recuperar a senha.',
        description: `
            Rota para solicitar envio de e-mail para recuperação de senha.
        `,
      }),
      ApiResponse({
        status: 201,
        schema: {
          example: {
            message: 'A solicitação de recuperação de e-mail foi enviada!',
          },
        },
      }),
    ),
  );
}
