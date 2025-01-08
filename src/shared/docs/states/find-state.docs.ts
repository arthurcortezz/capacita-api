import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindState() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar um estado pelo ID.',
        description: `
            Rota para realizar a busca de um estado especifico pelo seu ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            id: 1,
            name: 'Acre',
            uf: 'AC',
            createdAt: '2024-04-04T14:58:39.697Z',
            updatedAt: '2024-04-04T14:58:39.697Z',
            deletedAt: null,
          },
        },
      }),
    ),
  );
}
