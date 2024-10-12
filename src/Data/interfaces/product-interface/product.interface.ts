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