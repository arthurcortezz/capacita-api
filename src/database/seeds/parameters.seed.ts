import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ParameterEntity } from '../../modules/parameters/entities/parameter.entity';

export class ParametersSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ParameterEntity);
    await repository.insert([
      {
        key: 'QUANTIDADE_ITENS_POR_PAGINA',
        value: '5',
        description:
          'Parâmetro de configuração que representa a quantidade de itens máxima a visualizar por paginação.',
      },
    ]);
  }
}
