import { IHeadquarter } from "../headquarter-interface/headquarter.interface";
import { ISupplier } from "../supplier-interface/supplier.interface";
import { ICostumer } from "../costumer-interface/costumer.interface";

export interface ICompany {

  companyId: string;
  nit: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  headquarters: Array<IHeadquarter>;
  suppliers: Array<ISupplier>;
  costumers: Array<ICostumer>;
  
}

export type ICreateCompany = Pick<ICompany, 'nit'|'name'|'address'|'email'|'phone'>&{
  headquarters: Array<Pick<IHeadquarter, 'headquarterId'>>;
  suppliers: Array<Pick<ISupplier, 'supplierId'>>;
  costumers: Array<Pick<ICostumer, 'costumerId'>>;
}