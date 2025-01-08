import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function FindAllParameters() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar todos os parâmetros cadastrados.',
        description: `
            Rota para realizar a busca de todos os parâmetros.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: [
            {
              id: 1,
              key: 'QUANTIDADE_ITENS_POR_PAGINA',
              value: '5',
              description:
                'Parâmetro de configuração que representa a quantidade de itens máxima a visualizar por paginação.',
              createdAt: '2024-04-08T15:24:54.842Z',
              updatedAt: '2024-04-08T15:24:54.842Z',
              deletedAt: null,
            },
          ],
        },
      }),
    ),
  );
}
