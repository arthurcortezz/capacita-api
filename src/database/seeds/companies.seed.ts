import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { v4 as uuidv4 } from 'uuid';
import { CompanyAddressEntity } from '../../modules/companies/entities/company-address.entity';
import { CompanyEntity } from '../../modules/companies/entities/company.entity';

export class CompaniesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(CompanyEntity);
    await repository.insert([
      {
        name: 'Empresa Teste',
        socialReason: 'Empresa Teste ME',
        uuid: uuidv4(),
        cnpj: '87929486000125',
        phone: '81998333016',
        email: 'empresateste@email.com',
      },
      {
        name: 'Empresa Teste 2',
        socialReason: 'Empresa Teste 2 ME',
        uuid: uuidv4(),
        cnpj: '87929486000126',
        phone: '81998333017',
        email: 'empresateste2@email.com',
      },
    ]);

    const addressRepository = dataSource.getRepository(CompanyAddressEntity);
    await addressRepository.insert([
      {
        street: 'Rua Escalas Musicais',
        number: '429',
        complement: null,
        neighborhood: 'Jardim Bartira',
        cep: '08161260',
        cityId: 5270,
        companyId: 1,
      },
      {
        street: 'Avenida Silvio Carlos Viana',
        number: '2344',
        complement: 'Casa 2',
        neighborhood: 'Ponta Verde',
        cep: '57035160',
        cityId: 147,
        companyId: 2,
      },
    ]);
  }
}
