import { ICompany } from '../company-interface/company.interface';
import { IEmployee } from '../employee-interface/employee.interface';

export interface IHeadquarter {
  headquarterId: string;
  headquarterName: string;
  headquarterAddress: string;
  company: ICompany;
  employees: Array<IEmployee>;
}

export type ICreateHeadquarter = Pick<
  IHeadquarter,
  'headquarterName' | 'headquarterAddress'
> &
Partial<Pick<ICompany, 'companyId'>>;
