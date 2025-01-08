import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function FindAllCities() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar todas as cidades cadastradas.',
        description: `
            Rota para realizar a busca de todas as cidades.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: [
            {
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
            {
              id: 2,
              name: 'Água Doce do Norte',
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
          ],
        },
      }),
    ),
  );
}
