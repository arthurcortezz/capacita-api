import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";

import { RoleEntity } from "../../modules/roles/entities/role.entity";

export class RolesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(RoleEntity);
    await repository.insert([
      { name: "Administrador Geral" },
      { name: "Aluno" },
    ]);
  }
}
