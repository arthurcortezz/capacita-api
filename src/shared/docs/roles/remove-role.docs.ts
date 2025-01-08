import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function RemoveRole() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Remover um perfil de acesso pelo ID.',
        description: `
            Rota para realizar a remoção de um perfil de acesso pelo seu ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            message: 'O perfil de acesso foi removido com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 404,
        schema: {
          example: {
            message: 'Perfil de acesso não encontrado',
            error:
              'Não foi possível encontrar o perfil de acesso com esse ID: 123123123',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
