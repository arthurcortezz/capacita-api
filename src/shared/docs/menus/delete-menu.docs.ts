import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DeleteMenu() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Remover um menu do sistema.',
        description: `
            Rota para realizar a remoção de um menu pelo ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            menu: {
              id: 10,
              name: 'Dashboardasd',
              route: 'string',
              menuKey: 'string',
              icon: 'string',
              createdAt: '2024-04-05T18:20:16.932Z',
              updatedAt: '2024-04-05T18:34:47.024Z',
              deletedAt: null,
            },
            message: 'O menu foi atualizado com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 404,
        schema: {
          example: {
            message: 'O menu foi removido com sucesso',
          },
        },
      }),
    ),
  );
}
