import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function UpdateUser() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Editar um usuário especifico cadastrado no sistema.',
        description: `
            Rota para realizar a edição de um único usuário.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            user: {
              id: 4,
              name: 'string',
              email: 'email@mail.com.br',
              personType: 'FÍSICA',
              identificationNumber: '11111111111',
              phone: '82999999999',
              roleId: 1,
              companyId: null,
              rememberToken: null,
              resetPasswordAt: null,
              acceptedAt: '2024-04-04T15:58:40.256Z',
              createdAt: '2024-04-04T14:58:40.259Z',
              updatedAt: '2024-04-05T15:27:27.235Z',
              deletedAt: null,
            },
            message: 'O usuário foi atualizado com sucesso.',
          },
        },
      }),
      ApiBadRequestResponse({
        status: 400,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: [
              'ID: O campo "id" precisa ser um inteiro.',
              'ID: O campo "id" é obrigatório.',
              'Nome: O campo do "name" deve ser válido.',
              'Nome: O campo do "name" deve possuir no máximo 50 caracteres.',
              'Nome: O campo do "name" deve possuir no mínimo 2 caracteres.',
              'Nome: O campo do "name" não pode ser vazio.',
              'Nome: O campo do "name" deve ser uma string.',
              'E-mail: O campo do "email" deve ser válido.',
              'E-mail: O campo "email" deve ser válido.',
              'E-mail: O campo do "email" deve ser uma string.',
              'E-mail: O campo do "email" não pode ser vazio.',
              'E-mail: Já existe um Usuário com este Email.',
              'Tipo Pessoa: O campo de "personType" deve ser válido.',
              'Tipo Pessoa: O campo de "personType" deve ser válido (FÍSICA, JURÍDICA)',
              'Telefone: O campo "phone" deve ser uma string.',
              'Telefone: Somente números são permitidos.',
              'Telefone: O campo "phone" é obrigátorio.',
              'ID do Perfil de acesso: O campo "roleId" não pode ser vázio.',
              'Não existe um Perfil com esse ID.',
              'Empresa: O campo "companyId" deve ser um inteiro.',
              'Empresa: O campo "companyId" é obrigátorio.',
              'Não existe uma Empresa com esse ID.',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    ),
  );
}
