import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function CreateMenu() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Criar um menu no sistema.',
        description: `
            Rota para realizar o cadastro de um novo menu.
        `,
      }),
      ApiResponse({
        status: 201,
        schema: {
          example: {
            menu: {
              name: 'string',
              route: 'string',
              icon: 'string',
              menuKey: 'string',
              actionsMenus: [
                {
                  actionId: 1,
                  menuId: 10,
                  deletedAt: null,
                  id: 46,
                  createdAt: '2024-04-05T18:20:16.932Z',
                  updatedAt: '2024-04-05T18:20:16.932Z',
                },
                {
                  actionId: 2,
                  menuId: 10,
                  deletedAt: null,
                  id: 47,
                  createdAt: '2024-04-05T18:20:16.932Z',
                  updatedAt: '2024-04-05T18:20:16.932Z',
                },
                {
                  actionId: 3,
                  menuId: 10,
                  deletedAt: null,
                  id: 48,
                  createdAt: '2024-04-05T18:20:16.932Z',
                  updatedAt: '2024-04-05T18:20:16.932Z',
                },
                {
                  actionId: 4,
                  menuId: 10,
                  deletedAt: null,
                  id: 49,
                  createdAt: '2024-04-05T18:20:16.932Z',
                  updatedAt: '2024-04-05T18:20:16.932Z',
                },
                {
                  actionId: 5,
                  menuId: 10,
                  deletedAt: null,
                  id: 50,
                  createdAt: '2024-04-05T18:20:16.932Z',
                  updatedAt: '2024-04-05T18:20:16.932Z',
                },
              ],
              deletedAt: null,
              id: 10,
              createdAt: '2024-04-05T18:20:16.932Z',
              updatedAt: '2024-04-05T18:20:16.932Z',
            },
            message: 'O menu foi criado com sucesso.',
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: [
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
              'Chave de acesso: O campo "menuKey" pode ter no máximo 50 caracteres.',
              'Chave de acesso: O campo "menuKey" precisa ter pelo menos 3 caracteres.',
              'Chave de acesso: O campo "menuKey" é obrigatório.',
              'Chave de acesso: O campo "menuKey" precisa ser uma string.',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    ),
  );
}
