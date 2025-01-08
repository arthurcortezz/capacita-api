import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";

import { PrivilegeEntity } from "../../modules/menus/entities/privilege.entity";

export class PrivilegesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(PrivilegeEntity);
    await repository.insert([
      //DASHBOARD
      { actionMenuId: 1, roleId: 1 },
      { actionMenuId: 2, roleId: 1 },
      { actionMenuId: 3, roleId: 1 },
      { actionMenuId: 4, roleId: 1 },
      { actionMenuId: 5, roleId: 1 },
      { actionMenuId: 1, roleId: 2 },
      { actionMenuId: 2, roleId: 2 },
      { actionMenuId: 3, roleId: 2 },
      { actionMenuId: 4, roleId: 2 },
      { actionMenuId: 5, roleId: 2 },

      //USUÁRIOS
      { actionMenuId: 6, roleId: 1 },
      { actionMenuId: 7, roleId: 1 },
      { actionMenuId: 8, roleId: 1 },
      { actionMenuId: 9, roleId: 1 },
      { actionMenuId: 10, roleId: 1 },

      //CONSULTORES

      //EMPRESAS
      { actionMenuId: 16, roleId: 1 },
      { actionMenuId: 17, roleId: 1 },
      { actionMenuId: 18, roleId: 1 },
      { actionMenuId: 19, roleId: 1 },
      { actionMenuId: 20, roleId: 1 },

      //AÇÕES
      { actionMenuId: 21, roleId: 1 },
      { actionMenuId: 22, roleId: 1 },
      { actionMenuId: 23, roleId: 1 },
      { actionMenuId: 24, roleId: 1 },
      { actionMenuId: 25, roleId: 1 },

      //MENUS
      { actionMenuId: 26, roleId: 1 },
      { actionMenuId: 27, roleId: 1 },
      { actionMenuId: 28, roleId: 1 },
      { actionMenuId: 29, roleId: 1 },
      { actionMenuId: 30, roleId: 1 },

      //PERFIS DE ACESSOS
      { actionMenuId: 31, roleId: 1 },
      { actionMenuId: 32, roleId: 1 },
      { actionMenuId: 33, roleId: 1 },
      { actionMenuId: 34, roleId: 1 },
      { actionMenuId: 35, roleId: 1 },

      //TERMO DE SERVIÇO
      { actionMenuId: 36, roleId: 1 },
      { actionMenuId: 37, roleId: 1 },
      { actionMenuId: 38, roleId: 1 },
      { actionMenuId: 39, roleId: 1 },
      { actionMenuId: 40, roleId: 1 },

      //PARÂMETROS DO SISTEMA
      { actionMenuId: 41, roleId: 1 },
      { actionMenuId: 42, roleId: 1 },
      { actionMenuId: 43, roleId: 1 },
      { actionMenuId: 44, roleId: 1 },
      { actionMenuId: 45, roleId: 1 },
    ]);
  }
}
