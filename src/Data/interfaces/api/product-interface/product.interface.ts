import { ISale } from '../sale-interface/sale.interface';
import { ISupplier } from '../supplier-interface/supplier.interface';

export interface IProduct {
  productId: string;
  productCode: string;
  productName: string;
  productPrice: number;
  productAmount: number;
  productDescription: string;
  supplier: ISupplier;
  sales: Array<ISale>;
}

export type ICreateProduct = Pick<
  IProduct,
  | 'productCode'
  | 'productName'
  | 'productPrice'
  | 'productAmount'
  | 'productDescription'
> &
  Partial<Pick<ISupplier, 'supplierId'>>
