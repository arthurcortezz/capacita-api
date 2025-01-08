import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function FindAllCompanies() {
  return applyDecorators(
    applyDecorators(
      ApiOperation({
        summary: 'Buscar todas as empresas cadastradas.',
        description: `
            Rota para realizar a busca de todas as empresas.
        `,
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: [
            {
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
              address: {
                id: 1,
                street: 'Rua Escalas Musicais',
                number: '429',
                complement: null,
                neighborhood: 'Jardim Bartira',
                cep: '08161260',
                cityId: 5270,
                companyId: 1,
                createdAt: '2024-04-04T14:58:40.248Z',
                updatedAt: '2024-04-04T14:58:40.248Z',
                deletedAt: null,
              },
              users: [
                {
                  id: 2,
                  name: 'Administrador Empresa 1',
                  email: 'adm@empresa.com',
                  personType: 'FÍSICA',
                  identificationNumber: '12345678900',
                  phone: '82993443839',
                  roleId: 2,
                  companyId: 1,
                  rememberToken: null,
                  resetPasswordAt: null,
                  acceptedAt: '2024-04-04T15:58:40.256Z',
                  createdAt: '2024-04-04T14:58:40.259Z',
                  updatedAt: '2024-04-04T14:58:40.259Z',
                  deletedAt: null,
                },
              ],
            },
            {
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
              address: {
                id: 2,
                street: 'Avenida Silvio Carlos Viana',
                number: '2344',
                complement: 'Casa 2',
                neighborhood: 'Ponta Verde',
                cep: '57035160',
                cityId: 147,
                companyId: 2,
                createdAt: '2024-04-04T14:58:40.248Z',
                updatedAt: '2024-04-04T14:58:40.248Z',
                deletedAt: null,
              },
              users: [
                {
                  id: 5,
                  name: 'Consultor Empresa 2',
                  email: 'consultor2@empresa.com',
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
                },
              ],
            },
          ],
        },
      }),
    ),
  );
}
