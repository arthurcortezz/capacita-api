import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function CreateUser() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Cadastrar um novo usuário no sistema.',
        description: `
            Rota para realizar o cadastro de um usuário.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            id: 1,
            name: 'Usuario',
            email: 'email@mail.com.br',
            personType: 'FÍSICA',
            identificationNumber: '12345678909',
            phone: '82993223838',
            roleId: 3,
            companyId: 3,
            rememberToken: null,
            resetPasswordAt: '2024-04-04T18:25:21.341Z',
            acceptedAt: '2024-04-04T15:58:40.256Z',
            createdAt: '2024-04-04T14:58:40.259Z',
            updatedAt: '2024-04-04T21:34:15.939Z',
            deletedAt: null,
            role: {
              id: 3,
              name: 'Consultor',
              createdAt: '2024-04-04T14:58:40.201Z',
              updatedAt: '2024-04-04T14:58:40.201Z',
              deletedAt: null,
            },
          },
        },
      }),
    ),
  );
}
