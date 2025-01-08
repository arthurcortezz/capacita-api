import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";

import { MenusSeed } from "./seeds/menus.seed";
import { RolesSeed } from "./seeds/roles.seed";
import { UsersSeed } from "./seeds/users.seed";
import { StatesSeed } from "./seeds/states.seed";
import { CitiesSeed } from "./seeds/cities.seed";
import { ActionsSeed } from "./seeds/actions.seed";
import { CompaniesSeed } from "./seeds/companies.seed";
import { ParametersSeed } from "./seeds/parameters.seed";
import { PrivilegesSeed } from "./seeds/privileges.seed";
import { ormOptions } from "../config/database/data-source";
import { TermsServiceSeed } from "./seeds/terms-service.seed";
import { ActionsMenusSeed } from "./seeds/actions-menus.seed";

(async () => {
  const dataSource = new DataSource(ormOptions);
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: [
      TermsServiceSeed,
      StatesSeed,
      CitiesSeed,
      ActionsSeed,
      MenusSeed,
      RolesSeed,
      ActionsMenusSeed,
      PrivilegesSeed,
      CompaniesSeed,
      UsersSeed,
      ParametersSeed,
    ],
  });
})();
