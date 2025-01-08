import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function EditParameter() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Editar um parâmetro pelo ID.',
        description: `
            Rota para realizar a edição de um parâmetro pelo seu ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            parameter: {
              id: 2,
              key: 'STRING',
              value: 'string',
              description: 'string',
            },
            message: 'Parâmetro de sistema atualizado com sucesso!',
          },
        },
      }),
      ApiResponse({
        status: 404,
        schema: {
          example: {
            message: 'Parâmetro de sistema não encontrado',
            error:
              'Não foi possível encontrar um parâmetro de sistema com esse ID: 3',
            statusCode: 404,
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: [
              'O campo de ID do parâmetro do sistema precisa ser um inteiro.',
              'O campo de ID do parâmetro do sistema é obrigátorio.',
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
