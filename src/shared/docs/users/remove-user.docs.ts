import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function RemoveUser() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Remover um usuário especifico cadastrado no sistema.',
        description: `
            Rota para realizar a remoção de um único usuário.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            message: 'O usuário foi removido com sucesso.',
          },
        },
      }),
      ApiBadRequestResponse({
        status: 404,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: 'Usuário não encontrado',
            error: 'Não foi possível encontrar um usuário com esse ID: 7',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
