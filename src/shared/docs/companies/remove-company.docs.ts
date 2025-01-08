import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function RemoveCompany() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Remover uma empresa no sistema.',
        description: `
            Rota para realizar a remoção de uma empresa cadastrada pelo ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            message: 'A empresa foi removida com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: 'Empresa não encontrada',
            error: 'Não foi possível encontrar uma empresa com esse ID: 33123',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
