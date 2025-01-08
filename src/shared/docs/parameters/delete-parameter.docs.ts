import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DeleteParameter() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Excluir um parâmetro pelo ID.',
        description: `
            Rota para realizar a exclusão de um parâmetro pelo seu ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            message: 'Parâmetro de sistema excluído com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 404,
        schema: {
          example: {
            message: 'Parâmetro de sistema não encontrado',
            error:
              'Não foi possível encontrar um parâmetro de sistema com esse ID: 100110',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
