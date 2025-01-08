import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function EditAction() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Editar uma ação no sistema.',
        description: `
            Rota para realizar a edição de uma ação.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            action: {
              id: 1,
              name: 'Listar',
              createdAt: '2024-04-04T14:58:40.180Z',
              updatedAt: '2024-04-04T14:58:40.180Z',
              deletedAt: null,
            },
            message: 'A ação foi atualizada com sucesso.',
          },
        },
      }),
      ApiBadRequestResponse({
        status: 400,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: [
              'Ação: O campo "id" precisa ser um inteiro.',
              'Ação: O campo "id" é obrigatório.',
              'Ação: O campo "name" pode ter no máximo 50 caracteres.',
              'Ação: O campo "name" precisa ter pelo menos 3 caracteres.',
              'Ação: O campo "name" é obrigatório.',
              'Ação: O campo "name" precisa ser uma string.',
              'Ação: Já existe uma Ação com este nome.',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    ),
  );
}
