import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function FindRole() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar um perfil de acesso especifico pelo ID.',
        description: `
            Rota para realizar a busca de um perfil de acesso.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            id: 1,
            name: 'Administrador Geral',
            createdAt: '2024-04-04T14:58:40.201Z',
            updatedAt: '2024-04-04T14:58:40.201Z',
            deletedAt: null,
          },
        },
      }),
      ApiResponse({
        status: 404,
        schema: {
          example: {
            message: 'Perfil de acesso não encontrado',
            error:
              'Não foi possível encontrar o perfil de acesso com esse ID: 12333',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
