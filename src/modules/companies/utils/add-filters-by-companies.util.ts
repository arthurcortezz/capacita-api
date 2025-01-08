import { UserJwtInterface } from '../../authentication/interfaces/user-jwt.interface';
import { RolesProtectedEnum } from '../../roles/enum/roles.enum';
import { FilterObject } from '../../../shared/utils/typeorm/create-filters.utils';

export function addFiltersByCompanies(
  where: FilterObject,
  currentUser: UserJwtInterface,
) {
  if (currentUser.role.id !== RolesProtectedEnum.ADM_GERAL) {
    where.id = currentUser.company.id;
  }
  return where;
}
