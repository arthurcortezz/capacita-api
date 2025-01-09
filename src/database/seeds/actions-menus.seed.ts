import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { ActionMenuEntity } from "../../modules/actions/entities/action-menu.entity";

export class ActionsMenusSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ActionMenuEntity);
    await repository.insert([
      //DASHBOARD
      { actionId: 1, menuId: 1 },
      { actionId: 2, menuId: 1 },
      { actionId: 3, menuId: 1 },
      { actionId: 4, menuId: 1 },
      { actionId: 5, menuId: 1 },

      //USUÁRIOS
      { actionId: 1, menuId: 2 },
      { actionId: 2, menuId: 2 },
      { actionId: 3, menuId: 2 },
      { actionId: 4, menuId: 2 },
      { actionId: 5, menuId: 2 },

      //CONSULTORES
      { actionId: 1, menuId: 3 },
      { actionId: 2, menuId: 3 },
      { actionId: 3, menuId: 3 },
      { actionId: 4, menuId: 3 },
      { actionId: 5, menuId: 3 },

      //EMPRESAS
      { actionId: 1, menuId: 4 },
      { actionId: 2, menuId: 4 },
      { actionId: 3, menuId: 4 },
      { actionId: 4, menuId: 4 },
      { actionId: 5, menuId: 4 },

      //AÇÕES
      { actionId: 1, menuId: 5 },
      { actionId: 2, menuId: 5 },
      { actionId: 3, menuId: 5 },
      { actionId: 4, menuId: 5 },
      { actionId: 5, menuId: 5 },

      //MENUS
      { actionId: 1, menuId: 6 },
      { actionId: 2, menuId: 6 },
      { actionId: 3, menuId: 6 },
      { actionId: 4, menuId: 6 },
      { actionId: 5, menuId: 6 },

      //PERFIS DE ACESSOS
      { actionId: 1, menuId: 7 },
      { actionId: 2, menuId: 7 },
      { actionId: 3, menuId: 7 },
      { actionId: 4, menuId: 7 },
      { actionId: 5, menuId: 7 },

      //TERMO DE SERVIÇO
      { actionId: 1, menuId: 8 },
      { actionId: 2, menuId: 8 },
      { actionId: 3, menuId: 8 },
      { actionId: 4, menuId: 8 },
      { actionId: 5, menuId: 8 },

      //PARÂMETROS DO SISTEMA
      { actionId: 1, menuId: 9 },
      { actionId: 2, menuId: 9 },
      { actionId: 3, menuId: 9 },
      { actionId: 4, menuId: 9 },
      { actionId: 5, menuId: 9 },

      //CURSOS
      { actionId: 1, menuId: 10 },
      { actionId: 2, menuId: 10 },
      { actionId: 3, menuId: 10 },
      { actionId: 4, menuId: 10 },
      { actionId: 5, menuId: 10 },
    ]);
  }
}
