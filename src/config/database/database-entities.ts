import { UserEntity } from "../../modules/users/entities/user.entity";
import { MenuEntity } from "../../modules/menus/entities/menu.entity";
import { RoleEntity } from "../../modules/roles/entities/role.entity";
import { CityEntity } from "../../modules/cities/entities/city.entity";
import { StateEntity } from "../../modules/states/entities/state.entity";
import { ActionEntity } from "../../modules/actions/entities/action.entity";
import { PrivilegeEntity } from "../../modules/menus/entities/privilege.entity";
import { CompanyEntity } from "../../modules/companies/entities/company.entity";
import { ParameterEntity } from "../../modules/parameters/entities/parameter.entity";
import { ActionMenuEntity } from "../../modules/actions/entities/action-menu.entity";
import { UserAddressEntity } from "../../modules/users/entities/user-address.entity";
import { TermServiceEntity } from "../../modules/terms-service/entities/term-service.entity";
import { CompanyAddressEntity } from "../../modules/companies/entities/company-address.entity";
import { ViewMenuByUserRolesEntity } from "../../modules/authentication/entities/view-menu-by-user-roles.entity";
import { ViewPrivilegesByUserRolesEntity } from "../../modules/authentication/entities/view-privileges-by-user-roles.entity";

export const entities = [
  ActionEntity,
  ActionMenuEntity,
  CityEntity,
  CompanyEntity,
  CompanyAddressEntity,
  MenuEntity,
  ParameterEntity,
  PrivilegeEntity,
  RoleEntity,
  StateEntity,
  TermServiceEntity,
  UserEntity,
  UserAddressEntity,
  ViewMenuByUserRolesEntity,
  ViewPrivilegesByUserRolesEntity,
];
