import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function FindMenu() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar um menu cadastrado.',
        description: `
            Rota para realizar a busca de um menu especifico pelo ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            id: 5,
            name: 'Ações',
            route: 'acoes',
            menuKey: 'actions',
            icon: 'uil:action',
            createdAt: '2024-04-04T14:58:40.192Z',
            updatedAt: '2024-04-04T14:58:40.192Z',
            deletedAt: null,
          },
        },
      }),
    ),
  );
}
