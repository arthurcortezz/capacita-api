import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function CreateAction() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Criar uma ação no sistema.',
        description: `
            Rota para realizar a inclusão de uma ação.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            action: {
              name: 'Ação 1',
              deletedAt: null,
              id: 6,
              createdAt: '2024-04-05T15:45:43.474Z',
              updatedAt: '2024-04-05T15:45:43.474Z',
            },
            message: 'A ação foi criada com sucesso.',
          },
        },
      }),
      ApiBadRequestResponse({
        status: 400,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: [
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
