import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function UpdateMenu() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Editar um menu no sistema.',
        description: `
            Rota para realizar a edição de um menu pelo ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            menu: {
              id: 10,
              name: 'Dashboardasd',
              route: 'string',
              menuKey: 'string',
              icon: 'string',
              createdAt: '2024-04-05T18:20:16.932Z',
              updatedAt: '2024-04-05T18:34:47.024Z',
              deletedAt: null,
            },
            message: 'O menu foi atualizado com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 404,
        schema: {
          example: {
            message: 'Menu não encontrado',
            error: 'Não foi possível encontrar um menu com esse ID: 10123123',
            statusCode: 404,
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: [
              'Menu: O campo "id" precisa ser um inteiro.',
              'Menu: O campo "id" é obrigatório.',
              'Nome: O campo do "menu" pode ter no máximo 50 caracteres.',
              'Nome: O campo do "menu" precisa ter pelo menos 3 caracteres.',
              'Nome: O campo do "menu" é obrigatório.',
              'Nome: O campo do "menu" precisa ser uma string.',
              'Nome: Já existe um Menu com este nome.',
              'Rota: O campo "route" pode ter no máximo 50 caracteres.',
              'Rota: O campo "route" precisa ter pelo menos 3 caracteres.',
              'Rota: O campo "route" é obrigatório.',
              'Rota: O campo "route" precisa ser uma string.',
              'Ícone: O campo "icon" pode ter no máximo 50 caracteres.',
              'Ícone: O campo "icon" precisa ter pelo menos 3 caracteres.',
              'Ícone: O campo "icon" é obrigatório.',
              'Ícone: O campo "icon" precisa ser uma string.',
              'Chave do acesso: O campo "menuKey" pode ter no máximo 50 caracteres.',
              'Chave do acesso: O campo "menuKey" precisa ter pelo menos 3 caracteres.',
              'Chave do acesso: O campo "menuKey" é obrigatório.',
              'Chave do acesso: O campo "menuKey" precisa ser uma string.',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    ),
  );
}
