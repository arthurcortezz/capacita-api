import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function UpdateCompany() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Editar uma empresa no sistema.',
        description: `
            Rota para realizar a edição de uma empresa cadastrada pelo ID.
        `,
      }),
      ApiResponse({
        status: 201,
        schema: {
          example: {
            company: {
              id: 3,
              uuid: '2658e1ac-583c-4435-8805-2310862e8dbb',
              name: 'string',
              socialReason: 'string',
              cnpj: '59316526000128',
              phone: '8299999999',
              email: 'string@gmail.com',
              createdAt: '2024-04-05T16:38:06.772Z',
              updatedAt: '2024-04-05T17:50:55.867Z',
              deletedAt: null,
              address: {
                id: 4,
                street: 'string',
                number: '1',
                complement: 'string',
                neighborhood: 'string',
                cep: '57035160',
                cityId: 1,
                companyId: 3,
                createdAt: '2024-04-05T17:50:55.867Z',
                updatedAt: '2024-04-05T17:50:55.867Z',
                deletedAt: null,
              },
            },
            message: 'A empresa foi atualizada com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: [
              'Nome da Empresa: O campo "name" deve ser uma string.',
              'Nome da Empresa: O campo "name" não pode ser vázio.',
              'O campo Razão social é obrigátorio.',
              'O campo Razão social precisa ser uma string.',
              'Já existe uma Empresa com esta Razão Social.',
              'Somente números são permitidos.',
              'O campo CNPJ precisa ter pelo menos 14 caracteres.',
              'O campo CNPJ precisa ter pelo menos 14 caracteres.',
              'O campo CNPJ precisa ser válido',
              'O campo CNPJ é obrigátorio.',
              'O campo CPNJ precisa ser uma string.',
              'Já existe uma Empresa com este CNPJ.',
              'E-mail: O campo do "email" deve ser válido.',
              'E-mail: O campo "email" deve ser válido.',
              'E-mail: O campo do "email" deve ser uma string.',
              'E-mail: O campo do "email" não pode ser vazio.',
              'Telefone: Somente números são permitidos.',
              'Telefone: O campo "phone" deve ser uma string.',
              'Telefone: O campo "phone" é obrigátorio.',
              'O campo Endereço é obrigátorio.',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Empresa não encontrada.',
        schema: {
          example: {
            message: 'Empresa não encontrada',
            error:
              'Não foi possível encontrar uma empresa com esse ID: 1022222',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
