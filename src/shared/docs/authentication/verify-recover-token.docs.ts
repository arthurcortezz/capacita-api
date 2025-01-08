import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function VerifyToken() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Validar token de recuperação de senha.',
        description: `
            Rota para validar o token enviado para o e-mail do usuário ao solicitar a recuperação de senha.
        `,
      }),
      ApiResponse({
        status: 201,
        schema: {
          example: {
            id: 1,
            name: 'Usuário',
            email: 'email@mail.com.br',
            personType: 'FÍSICA',
            identificationNumber: '12345678909',
            phone: '8299999999',
            roleId: 3,
            companyId: 3,
            rememberToken: '5e4f50bf83211e4a4ff2d1b10f3e975f',
            resetPasswordAt: '2024-04-04T18:25:21.341Z',
            acceptedAt: '2024-04-04T15:58:40.256Z',
            createdAt: '2024-04-04T14:58:40.259Z',
            updatedAt: '2024-04-04T21:25:21.360Z',
            deletedAt: null,
          },
        },
      }),
    ),
  );
}
