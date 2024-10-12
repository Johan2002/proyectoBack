import { ICompany } from "../company-interface/company.interface";
import { IEmployee } from "../employee-interface/employee.interface";

export interface IHeadquarter {

  headquarterId: string;
  name: string;
  address: string;
  company: ICompany;
  employee: IEmployee;

}