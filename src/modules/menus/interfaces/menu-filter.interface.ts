import { ActionMenuInterface } from '../../actions/interfaces/action-menu.interface';

export interface MenuFilterInterface {
  id?: number;
  menu?: string;
  route?: string;
  icon?: string;
  menuKey?: string;
  actionsMenus?: ActionMenuInterface;
}
