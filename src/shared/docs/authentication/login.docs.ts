import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

export function LoginDocs() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Fazer Login',
        description: `
            Rota para efetuar o login em nosso sistema, passando os parâmetros de "email" e "senha".
        `,
      }),
      ApiResponse({
        status: 201,
        schema: {
          example: {
            user: {
              id: 3,
              name: 'Consultor Empresa 1',
              email: 'consultor@empresa.com',
              personType: 'FÍSICA',
              identificationNumber: '12345678901',
              phone: '82993443830',
              role: {
                id: 3,
                name: 'Consultor',
                createdAt: '2024-04-04T14:58:40.201Z',
                updatedAt: '2024-04-04T14:58:40.201Z',
                deletedAt: null,
              },
              company: {
                id: 1,
                uuid: '72e7dc7a-7236-4a10-89a0-d07416b8445a',
                name: 'Empresa Teste',
                socialReason: 'Empresa Teste ME',
                cnpj: '87929486000125',
                phone: '81998333016',
                email: 'empresateste@email.com',
                createdAt: '2024-04-04T14:58:40.241Z',
                updatedAt: '2024-04-04T14:58:40.241Z',
                deletedAt: null,
              },
              menus: [
                {
                  menu: 'Dashboard',
                  route: 'dashboard',
                  icon: 'uil:dashboard',
                  roleId: 3,
                  menuKey: 'dashboard',
                },
              ],
              privileges: [
                {
                  key: 'DASHBOARD_LISTAR',
                },
                {
                  key: 'DASHBOARD_CRIAR',
                },
                {
                  key: 'DASHBOARD_MODIFICAR',
                },
                {
                  key: 'DASHBOARD_REMOVER',
                },
                {
                  key: 'DASHBOARD_MENU',
                },
              ],
              acceptedAt: '2024-04-04T15:58:40.256Z',
              address: null,
            },
            accessToken: 'eyJhbGcwOiJcUzM45CIsInR5cCI6Ik...',
          },
        },
      }),
      ApiBadRequestResponse({
        status: 400,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: [
              'O campo "email" deve ser válido!',
              'O campo "email" não pode ser vazio!',
              'O campo "email" deve ser válido!',
              'Senha: O campo "password" deve ser válido!',
              'Senha: O campo "password" não pode ser vazio!',
              'Senha: O campo "password" deve ser uma string!',
            ],
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    ),
  );
}
