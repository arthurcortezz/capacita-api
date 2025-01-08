import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function FindAllRoles() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar todos os perfil de acesso cadastrados.',
        description: `
            Rota para realizar a busca de todos os perfil de acesso.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: [
            {
              id: 1,
              name: 'Administrador Geral',
              createdAt: '2024-04-04T14:58:40.201Z',
              updatedAt: '2024-04-04T14:58:40.201Z',
              deletedAt: null,
            },
            {
              id: 2,
              name: 'Administrador Organização',
              createdAt: '2024-04-04T14:58:40.201Z',
              updatedAt: '2024-04-04T14:58:40.201Z',
              deletedAt: null,
            },
            {
              id: 3,
              name: 'Consultor',
              createdAt: '2024-04-04T14:58:40.201Z',
              updatedAt: '2024-04-04T14:58:40.201Z',
              deletedAt: null,
            },
          ],
        },
      }),
    ),
  );
}
