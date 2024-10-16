import { ISale } from "../sale-interface/sale.interface";
import { ISupplier } from "../supplier-interface/supplier.interface";

export interface IProduct {

  productId: string;
  code: string;
  name: string;
  price: number;
  amount: number;
  description: string;
  supplier: ISupplier;
  sales: Array<ISale>;

}

export type ICreateProduct = Pick<IProduct, 'code'|'name'|'price'|'amount'|'description'>&{
  supplier: Pick<ISupplier, 'supplierId'>;
  sales: Array<Pick<ISale, 'saleId'>>;
}