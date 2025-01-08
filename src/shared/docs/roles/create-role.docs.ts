import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function CreateRole() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Criar um novo perfil de acesso.',
        description: `
            Rota para realizar a inclusão de um novo perfil de acesso.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            role: {
              name: 'Role 1',
              deletedAt: null,
              id: 4,
              createdAt: '2024-04-05T19:22:48.312Z',
              updatedAt: '2024-04-05T19:22:48.312Z',
            },
            message: 'O perfil de acesso foi criado com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: [
              'O campo de nome pode ter no máximo 50 caracteres.',
              'O campo de nome precisa ter pelo menos 3 caracteres.',
              'O campo de nome é obrigátorio.',
              'O campo de nome precisa ser uma string.',
              'Já existe uma Perfil de Acesso com este nome.',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    ),
  );
}
