import { ICostumer } from "../costumer-interface/costumer.interface";
import { IEmployee } from "../employee-interface/employee.interface";
import { IProduct } from "../product-interface/product.interface";

export interface ISale {

  saleId: string;
  amount: number;
  price: number;
  date_sale: Date;
  employee: IEmployee;
  costumer: ICostumer;
  product: IProduct;

}
