import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function VerifyTerms() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Validar se o usuário aceitou ou não os termos de uso.',
        description: `
            Rota onde é informado o ID do usuário para validar se ele aceitou ou não os termos de serviço.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            message: 'Termo de serviço foi aceito',
            accessToken: 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6MSw',
            user: {
              id: 1,
              name: 'Usuário',
              email: 'email@mail.com.br',
              personType: 'FÍSICA',
              identificationNumber: '12345678909',
              phone: '82999999999',
              role: {
                id: 1,
                name: 'Consultor',
                createdAt: '2024-04-04T14:58:40.201Z',
                updatedAt: '2024-04-04T14:58:40.201Z',
                deletedAt: null,
              },
              company: 3,
              menus: [
                {
                  menu: 'Empresas',
                  route: 'empresas',
                  icon: 'uil:buildings-bold',
                  roleId: 1,
                  menuKey: 'companies',
                },
              ],
              privileges: [
                {
                  key: 'COMPANIES_LISTAR',
                },
                {
                  key: 'COMPANIES_CRIAR',
                },
                {
                  key: 'COMPANIES_MODIFICAR',
                },
                {
                  key: 'COMPANIES_REMOVER',
                },
                {
                  key: 'COMPANIES_MENU',
                },
              ],
              acceptedAt: '2024-04-04T15:58:40.256Z',
              address: {
                id: 1,
                street: 'Rua Escalas Musicais',
                number: '429',
                complement: null,
                neighborhood: 'Jardim Bartira',
                cep: '08161260',
                cityId: 5270,
                userId: 1,
                createdAt: '2024-04-04T14:58:40.267Z',
                updatedAt: '2024-04-04T14:58:40.267Z',
                deletedAt: null,
                city: {
                  id: 5270,
                  name: 'São Sebastião da Grama',
                  stateId: 26,
                  createdAt: '2024-04-04T14:58:39.814Z',
                  updatedAt: '2024-04-04T14:58:39.814Z',
                  deletedAt: null,
                  state: {
                    id: 26,
                    name: 'São Paulo',
                    uf: 'SP',
                    createdAt: '2024-04-04T14:58:39.697Z',
                    updatedAt: '2024-04-04T14:58:39.697Z',
                    deletedAt: null,
                  },
                },
              },
            },
          },
        },
      }),
    ),
  );
}
