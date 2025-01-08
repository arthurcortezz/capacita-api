import { applyDecorators } from '@nestjs/common';
import {
  ApiResponse,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

export function FindCompany() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar uma empresa no sistema.',
        description: `
            Rota para realizar a busca de uma empresa cadastrada pelo ID.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: [
            {
              id: 1,
              name: 'Afonso Cláudio',
              stateId: 8,
              createdAt: '2024-04-04T14:58:39.814Z',
              updatedAt: '2024-04-04T14:58:39.814Z',
              deletedAt: null,
              state: {
                id: 8,
                name: 'Espírito Santo',
                uf: 'ES',
                createdAt: '2024-04-04T14:58:39.697Z',
                updatedAt: '2024-04-04T14:58:39.697Z',
                deletedAt: null,
              },
            },
            {
              id: 2,
              name: 'Água Doce do Norte',
              stateId: 8,
              createdAt: '2024-04-04T14:58:39.814Z',
              updatedAt: '2024-04-04T14:58:39.814Z',
              deletedAt: null,
              state: {
                id: 8,
                name: 'Espírito Santo',
                uf: 'ES',
                createdAt: '2024-04-04T14:58:39.697Z',
                updatedAt: '2024-04-04T14:58:39.697Z',
                deletedAt: null,
              },
            },
          ],
        },
      }),
      ApiBadRequestResponse({
        status: 400,
        description: 'Erro nos dados inseridos.',
        schema: {
          example: {
            message: 'Empresa não encontrada',
            error: 'Não foi possível encontrar uma empresa com esse ID: 12333',
            statusCode: 404,
          },
        },
      }),
    ),
  );
}
