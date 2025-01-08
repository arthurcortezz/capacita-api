import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function FindAllMenus() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar todos os menus cadastrados.',
        description: `
            Rota para realizar a busca de todos os menus.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: [
            {
              id: 5,
              name: 'Ações',
              route: 'acoes',
              menuKey: 'actions',
              icon: 'uil:action',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
            {
              id: 3,
              name: 'Consultores',
              route: 'consultores',
              menuKey: 'consultants',
              icon: 'uil:shield-person',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
            {
              id: 1,
              name: 'Dashboard',
              route: 'dashboard',
              menuKey: 'dashboard',
              icon: 'uil:dashboard',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
            {
              id: 4,
              name: 'Empresas',
              route: 'empresas',
              menuKey: 'companies',
              icon: 'uil:buildings-bold',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
            {
              id: 6,
              name: 'Menus',
              route: 'menus',
              menuKey: 'menus',
              icon: 'uil:menu-round',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
            {
              id: 9,
              name: 'Parâmetros de Sistema',
              route: 'parametros-de-sistema',
              menuKey: 'parameters',
              icon: 'mat_outline:settings',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
            {
              id: 7,
              name: 'Perfis de Acessos',
              route: 'perfis-de-acessos',
              menuKey: 'roles',
              icon: 'uil:profile',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
            {
              id: 8,
              name: 'Termo de Serviço',
              route: 'termo-de-servico',
              menuKey: 'terms-service',
              icon: 'uil:buildings-bold',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
            {
              id: 2,
              name: 'Usuários',
              route: 'usuarios',
              menuKey: 'users',
              icon: 'mat_outline:group',
              createdAt: '2024-04-04T14:58:40.192Z',
              updatedAt: '2024-04-04T14:58:40.192Z',
              deletedAt: null,
            },
          ],
        },
      }),
    ),
  );
}
