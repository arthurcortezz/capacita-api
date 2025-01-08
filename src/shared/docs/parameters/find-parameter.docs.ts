import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function FindParameter() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar um parâmetro cadastrado pelo ID.',
        description: `
            Rota para realizar a busca de um parâmetro especifico pelo seu ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            id: 1,
            key: 'QUANTIDADE_ITENS_POR_PAGINA',
            value: '5',
            description:
              'Parâmetro de configuração que representa a quantidade de itens máxima a visualizar por paginação.',
            createdAt: '2024-04-08T15:24:54.842Z',
            updatedAt: '2024-04-08T15:24:54.842Z',
            deletedAt: null,
          },
        },
      }),
      ApiResponse({
        status: 404,
        schema: {
          example: {
            message: 'Parâmetro de sistema não encontrado',
            error:
              'Não foi possível encontrar um parâmetro de sistema com esse ID: 123123',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
