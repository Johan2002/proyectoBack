import { ICompany } from '../company-interface/company.interface';
import { IEmployee } from '../employee-interface/employee.interface';
import { ISale } from '../sale-interface/sale.interface';

export interface IHeadquarter {
  headquarterId: string;
  headquarterName: string;
  headquarterAddress: string;
  company: ICompany;
  employees: Array<IEmployee>;
  sales: Array<ISale>;
}

export type ICreateHeadquarter = Pick<
  IHeadquarter,
  'headquarterName' | 'headquarterAddress'
> &
  Partial<Pick<ICompany, 'companyId'>>;

export type IUpdateHeadquarter = Partial<ICreateHeadquarter>;
