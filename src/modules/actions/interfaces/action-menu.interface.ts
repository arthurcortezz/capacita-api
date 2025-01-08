import { ActionInterface } from './action.interface';
import { MenuInterface } from '../../menus/interfaces/menu.interface';
import { PrivilegeInterface } from '../../menus/interfaces/privilege.interface';

export interface ActionMenuInterface {
  id?: number;
  actionId: number;
  action?: ActionInterface;
  menuId: number;
  menu?: MenuInterface;
  privileges?: PrivilegeInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
