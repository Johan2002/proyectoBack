import { ICompany } from '../company-interface/company.interface';
import { IEmployee } from '../employee-interface/employee.interface';

export interface IHeadquarter {
  headquarterId: string;
  name: string;
  address: string;
  company: ICompany;
  employees: Array<IEmployee>;
}

export type ICreateHeadquarter = Pick<IHeadquarter, 'name' | 'address'> & {
  company: Pick<ICompany, 'companyId'>;
  employees: Array<Pick<IEmployee, 'employeeId'>>;
};
