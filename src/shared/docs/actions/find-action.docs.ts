import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function FindAction() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar uma única ação disponível no sistema.',
        description: `
            Rota para realizar a busca de uma única ação.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            id: 3,
            name: 'Modificar',
            createdAt: '2024-04-04T14:58:40.180Z',
            updatedAt: '2024-04-04T14:58:40.180Z',
            deletedAt: null,
          },
        },
      }),
      ApiBadRequestResponse({
        status: 400,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: 'Ação não encontrada',
            error: 'Não foi possível encontrar uma ação com esse ID: 9',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
