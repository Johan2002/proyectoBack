import { ICompany } from '../company-interface/company.interface';
import { IProduct } from '../product-interface/product.interface';

export interface ISupplier {
  supplierId: string;
  nit: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  company: Array<ICompany>;
  products: Array<IProduct>;
}

export type ICreateSupplier = Pick<
  ISupplier,
  'nit' | 'name' | 'address' | 'phone' | 'email'
> & {
  company: Array<Pick<ICompany, 'companyId'>>;
  products: Array<Pick<IProduct, 'productId'>>;
};
