import { ICompany } from '../company-interface/company.interface';
import { IProduct } from '../product-interface/product.interface';

export interface ISupplier {
  supplierId: string;
  supplierNit: string;
  supplierName: string;
  supplierAddress: string;
  supplierPhone: string;
  supplierEmail: string;
  company: Array<ICompany>;
  products: Array<IProduct>;
}

export type ICreateSupplier = Pick<
  ISupplier,
  | 'supplierNit'
  | 'supplierName'
  | 'supplierAddress'
  | 'supplierPhone'
  | 'supplierEmail'
> &
  Partial<Pick<ICompany, 'companyId'>>
