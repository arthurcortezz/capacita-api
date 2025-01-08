import { CompanyInterface } from "../../companies/interfaces/company.interface";
import { RoleInterface } from "../../roles/interfaces/role.interface";
import { UserAddressInterface } from "./user-address.interface";

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password: string;
  personType: string;
  identificationNumber: string;
  phone: string;
  roleId: number;
  role?: RoleInterface;
  companyId?: number | null;
  company?: CompanyInterface;
  rememberToken: string;
  resetPasswordAt: Date;
  acceptedAt?: Date;
  address?: UserAddressInterface;
  plan?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
