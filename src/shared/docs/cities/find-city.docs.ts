import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindCity() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar uma cidade no sistema.',
        description: `
            Rota para realizar a busca de uma cidade especifica.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            id: 1,
            name: 'Afonso Cláudio',
            stateId: 8,
            createdAt: '2024-04-04T14:58:39.814Z',
            updatedAt: '2024-04-04T14:58:39.814Z',
            deletedAt: null,
            state: {
              id: 8,
              name: 'Espírito Santo',
              uf: 'ES',
              createdAt: '2024-04-04T14:58:39.697Z',
              updatedAt: '2024-04-04T14:58:39.697Z',
              deletedAt: null,
            },
          },
        },
      }),
    ),
  );
}
