import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function UpdateRole() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Editar um perfil de acesso pelo ID.',
        description: `
            Rota para realizar a edição de um novo perfil de acesso.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            role: {
              id: 4,
              name: 'Perfil 1',
              createdAt: '2024-04-05T19:22:48.312Z',
              updatedAt: '2024-04-05T20:03:12.106Z',
              deletedAt: null,
            },
            message: 'O perfil de acesso foi atualizado com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 404,
        schema: {
          example: {
            message: 'Perfil de acesso não encontrado',
            error:
              'Não foi possível encontrar o perfil de acesso com esse ID: 123123213',
            statusCode: 404,
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: [
              'Perfil de Acesso: O campo de ID do Perfil de Acesso precisa ser um inteiro.',
              'Perfil de Acesso: O campo de ID do Perfil de Acesso é obrigátorio.',
              'Perfil de Acesso: O campo de nome pode ter no máximo 50 caracteres.',
              'Perfil de Acesso: O campo de nome precisa ter pelo menos 3 caracteres.',
              'Perfil de Acesso: O campo de nome é obrigátorio.',
              'Perfil de Acesso: O campo de nome precisa ser uma string.',
              'Perfil de Acesso: Já existe uma Perfil de Acesso com este nome.',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    ),
  );
}
