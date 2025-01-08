import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function CreateParameter() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Criar um novo parâmetro.',
        description: `
            Rota para realizar a criação de um novo parâmetro.
        `,
      }),
      ApiResponse({
        status: 201,
        schema: {
          example: {
            parameter: {
              key: 'STRING',
              value: 'string',
              description: 'string',
              deletedAt: null,
              id: 2,
              createdAt: '2024-04-09T14:16:49.765Z',
              updatedAt: '2024-04-09T14:16:49.765Z',
            },
            message: 'Parâmetro do sistema cadastrado com sucesso!',
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: [
              'Campo chave não pode ser vazio.',
              'Campo chave é obrigatório.',
              'Já existe um parâmetro de sistema registrado com as informações fornecidas. Por favor altere a informação para realizar a operação.',
              'Campo valor não pode ser vazio.',
              'Campo valor é obrigatório.',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    ),
  );
}
