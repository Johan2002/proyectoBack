import { IProduct } from "../product-interface/product.interface";
import { ISale } from "../sale-interface/sale.interface";

export interface ISaleDetail {
  saleDetailId: string;
  sale: ISale;
  product: IProduct;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  total: number;
}

export type ICreateSaleDetail = Omit<
  ISaleDetail,
  'saleDetailId' | 'sale' | 'product'
> & {
  saleId: string;
  productId: string;
};
