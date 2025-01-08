import { UserInterface } from '../../users/interfaces/user.interface';
import { CompanyAddressInterface } from './company-address.interface';

export interface CompanyInterface {
  id?: number;
  uuid: string;
  name: string;
  socialReason: string;
  cnpj: string;
  phone: string;
  email: string;
  address?: CompanyAddressInterface;
  users?: UserInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
