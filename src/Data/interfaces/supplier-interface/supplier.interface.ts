import { ICompany } from "../company-interface/company.interface";
import { IProduct } from "../product-interface/product.interface";

export interface ISupplier {

  supplierId: string;
  nit: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  company: ICompany;
  products: Array<IProduct>;

}