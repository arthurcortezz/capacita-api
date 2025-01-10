import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";

import { MenuEntity } from "../../modules/menus/entities/menu.entity";

export class MenusSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(MenuEntity);
    await repository.insert([
      {
        name: "Dashboard",
        route: "dashboard",
        icon: "uil:dashboard",
        menuKey: "dashboard",
      },
      {
        name: "Usuários",
        route: "usuarios",
        icon: "mat_outline:group",
        menuKey: "users",
      },
      {
        name: "Consultores",
        route: "consultores",
        icon: "uil:shield-person",
        menuKey: "consultants",
      },
      {
        name: "Empresas",
        route: "empresas",
        icon: "uil:buildings-bold",
        menuKey: "companies",
      },
      {
        name: "Ações",
        route: "acoes",
        icon: "uil:actions",
        menuKey: "actions",
      },
      {
        name: "Menus",
        route: "menus",
        icon: "uil:menu-round",
        menuKey: "menus",
      },
      {
        name: "Perfis de Acessos",
        route: "perfis-de-acessos",
        icon: "uil:profile",
        menuKey: "roles",
      },
      {
        name: "Termo de Serviço",
        route: "termo-de-servico",
        icon: "uil:buildings-bold",
        menuKey: "terms-service",
      },
      {
        name: "Parâmetros do sistema",
        route: "parametros-de-sistema",
        icon: "mat_outline:settings",
        menuKey: "parameters",
      },
      {
        name: "Cursos",
        route: "cursos",
        icon: "uil:courses",
        menuKey: "courses",
      },
    ]);
  }
}
