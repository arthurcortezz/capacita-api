import { CityInterface } from '../../cities/interfaces/city.interface';

export interface CompanyAddressInterface {
  id?: number;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  cep: string;
  cityId: number;
  city?: CityInterface;
  companyId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
