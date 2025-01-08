import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAllConsultants() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary:
          'Buscar todos os usuários com o perfil de consultor cadastrados no sistema.',
        description: `
            Rota para realizar a busca de todos os usuários consultores.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: [
            {
              id: 5,
              name: 'Consultor Empresa 2',
              email: 'consultor22@empresa.com',
              personType: 'FÍSICA',
              identificationNumber: '12345678902',
              phone: '82993443841',
              roleId: 3,
              companyId: 2,
              rememberToken: null,
              resetPasswordAt: null,
              acceptedAt: '2024-04-04T15:58:40.256Z',
              createdAt: '2024-04-04T14:58:40.259Z',
              updatedAt: '2024-04-04T14:58:40.259Z',
              deletedAt: null,
              role: {
                id: 3,
                name: 'Consultor',
                createdAt: '2024-04-04T14:58:40.201Z',
                updatedAt: '2024-04-04T14:58:40.201Z',
                deletedAt: null,
              },
              company: {
                id: 2,
                uuid: 'ecd944b1-36b6-4383-8e44-a6b21da588ab',
                name: 'Empresa Teste 2',
                socialReason: 'Empresa Teste 2 ME',
                cnpj: '87929486000126',
                phone: '81998333017',
                email: 'empresateste2@email.com',
                createdAt: '2024-04-04T14:58:40.241Z',
                updatedAt: '2024-04-04T14:58:40.241Z',
                deletedAt: null,
              },
            },
            {
              id: 3,
              name: 'string',
              email: 'string@gmail.com',
              personType: 'FÍSICA',
              identificationNumber: '11835425429',
              phone: '8299999999',
              roleId: 3,
              companyId: 1,
              rememberToken: null,
              resetPasswordAt: null,
              acceptedAt: '2024-04-04T15:58:40.256Z',
              createdAt: '2024-04-04T14:58:40.259Z',
              updatedAt: '2024-04-04T22:16:33.738Z',
              deletedAt: null,
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
            },
          ],
        },
      }),
    ),
  );
}
