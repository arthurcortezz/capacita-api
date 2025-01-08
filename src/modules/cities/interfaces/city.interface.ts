import { UserAddressInterface } from '../../users/interfaces/user-address.interface';
import { StateInterface } from '../../states/interfaces/state.interface';
import { CompanyAddressInterface } from '../../companies/interfaces/company-address.interface';

export interface CityInterface {
  id?: number;
  name: string;
  stateId: number;
  state?: StateInterface;
  userAddress?: UserAddressInterface;
  companyAddress?: CompanyAddressInterface;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
