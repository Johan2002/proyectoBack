import { ICustomer } from '../costumer-interface/costumer.interface';
import { IHeadquarter } from '../headquarter-interface/headquarter.interface';
import { ISupplier } from '../supplier-interface/supplier.interface';

export interface ICompany {
  companyId: string;
  companyNit: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  headquarters: Array<IHeadquarter>;
  suppliers: Array<ISupplier>;
  customers: Array<ICustomer>;
}

export type ICreateCompany = Pick<
  ICompany,
  | 'companyNit'
  | 'companyName'
  | 'companyAddress'
  | 'companyPhone'
  | 'companyEmail'
>;
