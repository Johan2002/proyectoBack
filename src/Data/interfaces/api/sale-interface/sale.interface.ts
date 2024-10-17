import { ICustomer } from '../costumer-interface/costumer.interface';
import { IEmployee } from '../employee-interface/employee.interface';
import { IProduct } from '../product-interface/product.interface';

export interface ISale {
  saleId: string;
  date_sale: Date;
  employee: IEmployee;
  customer: ICustomer;
  products: Array<IProduct>;
}

export type ICreateSale = {
  employee: Pick<IEmployee, 'employeeId'>;
  customer: Pick<ICustomer, 'customerId'>;
  products: Array<Pick<IProduct, 'productId'>>;
};
