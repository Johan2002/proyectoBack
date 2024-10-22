import { IProduct } from '../product-interface/product.interface';
import { ISale } from '../sale-interface/sale.interface';

export interface ISaleDetail {
  saleDetailId: string;
  quantity: number;
  unitPrice: number;
  // subtotal: number;
  // total: number;
  sale: ISale;
  product: Array<IProduct>;
}

export type ICreateSaleDetail = Pick<ISaleDetail, 'quantity' | 'unitPrice'> &
  Partial<Pick<ISale, 'saleId'>> & { product?: Array<Partial<IProduct>> };
