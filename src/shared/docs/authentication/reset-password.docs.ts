import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ResetPassword() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Mudar a senha.',
        description: `
            Rota para efetuar a troca da senha, utilizando o token enviado pelo e-mail.
        `,
      }),
      ApiResponse({
        status: 201,
        schema: {
          example: {
            message: 'A senha foi redefinida com sucesso!',
          },
        },
      }),
    ),
  );
}
