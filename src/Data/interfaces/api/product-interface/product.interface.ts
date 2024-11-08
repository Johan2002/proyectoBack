import { ISupplier } from '../supplier-interface/supplier.interface';
import { ITax } from '../taxes-interface/taxes.interface';

export interface IProduct {
  productId: string;
  productCode: string;
  productName: string;
  productPrice: number;
  productAmount: number;
  productUnitValue: number;
  productDescription: string;
  supplier: ISupplier;
  tax: Array<ITax>;
}

export type ICreateProduct = Omit<IProduct, 'productId' | 'tax'> &
  Partial<Pick<ISupplier, 'supplierId'>> &
  Record<'tax', Array<Pick<ITax, 'taxId'>>>;

export type IUpdateProduct = Partial<ICreateProduct>;
