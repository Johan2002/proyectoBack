import { ISaleDetail } from '../sale-detail-interface/sale-detail.interface';
import { ISupplier } from '../supplier-interface/supplier.interface';

export interface IProduct {
  productId: string;
  productCode: string;
  productName: string;
  productPrice: number;
  productAmount: number;
  productUnitValue: number;
  productDescription: string;
  supplier: ISupplier;
  saleDetails: Array<ISaleDetail>;
}

export type ICreateProduct = Pick<
  IProduct,
  | 'productCode'
  | 'productName'
  | 'productPrice'
  | 'productAmount'
  | 'productUnitValue'
  | 'productDescription'
> &
  Partial<Pick<ISupplier, 'supplierId'>>;
