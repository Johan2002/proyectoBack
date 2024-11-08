import { ICompany } from '../company-interface/company.interface';
import { ISale } from '../sale-interface/sale.interface';

export interface ICustomer {
  customerId: string;
  customerIdentity: string;
  customerName: string;
  customerLastname: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  company: ICompany;
  sales: Array<ISale>;
}

export type ICreateCustomer = Pick<
  ICustomer,
  | 'customerIdentity'
  | 'customerName'
  | 'customerLastname'
  | 'customerPhone'
  | 'customerEmail'
> &
  Partial<Pick<ICompany, 'companyId'>>;

export type IUpdateCustomer = Partial<ICreateCustomer>;
