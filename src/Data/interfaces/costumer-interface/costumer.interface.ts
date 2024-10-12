import { ICompany } from "../company-interface/company.interface";
import { ISale } from "../sale-interface/sale.interface";

export interface ICostumer {

  costumerId: string;
  identity: string;
  name: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  company: ICompany;
  sales: Array<ISale>;
  
}