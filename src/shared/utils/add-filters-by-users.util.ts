import { RolesProtectedEnum } from '../../modules/roles/enum/roles.enum';
import { UserJwtInterface } from '../../modules/authentication/interfaces/user-jwt.interface';
import { FilterObject } from './typeorm/create-filters.utils';
import { MoreThanOrEqual } from 'typeorm';

export function addFiltersByUsers(
  where: FilterObject,
  currentUser: UserJwtInterface,
) {
  if (currentUser.role.id !== RolesProtectedEnum.ADM_GERAL) {
    where.companyId = currentUser.company.id;
    where.roleId = MoreThanOrEqual(currentUser.role.id);
  }
  return where;
}

export function addFiltersByConsultants(
  where: FilterObject,
  currentUser: UserJwtInterface,
) {
  if (currentUser.role.id !== RolesProtectedEnum.ADM_GERAL) {
    where.companyId = currentUser.company.id;
  }
  where.roleId = RolesProtectedEnum.CONSULTOR;
  return where;
}
