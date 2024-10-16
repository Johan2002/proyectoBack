import { ICostumer } from "../costumer-interface/costumer.interface";
import { IEmployee } from "../employee-interface/employee.interface";
import { IProduct } from "../product-interface/product.interface";

export interface ISale {

  saleId: string;
  date_sale: Date;
  employee: IEmployee;
  costumer: ICostumer;
  products: Array<IProduct>;

}

export type ICreateSale = {
  employee: Pick<IEmployee, 'employeeId'>;
  costumer: Pick<ICostumer, 'costumerId'>;
  products: Array<Pick<IProduct, 'productId'>>;
}
