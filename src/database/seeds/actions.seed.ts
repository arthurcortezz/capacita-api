import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { ActionEntity } from '../../modules/actions/entities/action.entity';

export class ActionsSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ActionEntity);
    await repository.insert([
      { name: 'Listar' },
      { name: 'Criar' },
      { name: 'Modificar' },
      { name: 'Remover' },
      { name: 'Menu' },
    ]);
  }
}
