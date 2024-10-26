import { IProduct } from '../product-interface/product.interface';
import { ISale } from '../sale-interface/sale.interface';

export interface ISaleDetail {
  saleDetailId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  totalTaxes: number;
  total: number;
  sale: ISale;
  product: IProduct;
}

export type ICreateSaleDetail = Omit<
  ISaleDetail,
  'saleDetailId' | 'sale' | 'product'
> & {
  saleId: string;
  productId: string;
};
