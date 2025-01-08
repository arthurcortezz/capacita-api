import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function RemoveAction() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Remover uma ação no sistema.',
        description: `
            Rota para realizar a remoção de uma ação.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            message: 'A ação foi removida com sucesso.',
          },
        },
      }),
      ApiBadRequestResponse({
        status: 404,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: 'Ação não encontrada',
            error: 'Não foi possível encontrar uma ação com esse ID: 978',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
