import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TermServiceEntity } from '../../modules/terms-service/entities/term-service.entity';

export class TermsServiceSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(TermServiceEntity);
    await repository.insert([
      {
        name: 'Termos de Serviço',
        description: 'Lorem ipsum sit dolor amet.',
      },
    ]);
  }
}
