import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllActions() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar todas as ações disponíveis no sistema.',
        description: `
            Rota para realizar a busca de todas as ações.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: [
            {
              id: 2,
              name: 'Criar',
              createdAt: '2024-04-04T14:58:40.180Z',
              updatedAt: '2024-04-04T14:58:40.180Z',
              deletedAt: null,
            },
            {
              id: 1,
              name: 'Listar',
              createdAt: '2024-04-04T14:58:40.180Z',
              updatedAt: '2024-04-04T14:58:40.180Z',
              deletedAt: null,
            },
            {
              id: 5,
              name: 'Menu',
              createdAt: '2024-04-04T14:58:40.180Z',
              updatedAt: '2024-04-04T14:58:40.180Z',
              deletedAt: null,
            },
            {
              id: 3,
              name: 'Modificar',
              createdAt: '2024-04-04T14:58:40.180Z',
              updatedAt: '2024-04-04T14:58:40.180Z',
              deletedAt: null,
            },
            {
              id: 4,
              name: 'Remover',
              createdAt: '2024-04-04T14:58:40.180Z',
              updatedAt: '2024-04-04T14:58:40.180Z',
              deletedAt: null,
            },
          ],
        },
      }),
    ),
  );
}
