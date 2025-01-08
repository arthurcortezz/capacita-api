import { ActionMenuInterface } from '../../actions/interfaces/action-menu.interface';
import { RoleInterface } from '../../roles/interfaces/role.interface';

export interface PrivilegeInterface {
  id?: number;
  actionMenuId: number;
  actionMenu?: ActionMenuInterface;
  roleId: number;
  role?: RoleInterface;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
