import { ICustomer } from '../costumer-interface/costumer.interface';
import { IEmployee } from '../employee-interface/employee.interface';
import { IProduct } from '../product-interface/product.interface';
import { ISaleDetail } from '../sale-detail-interface/sale-detail.interface';

export interface ISale {
  saleId: string;
  subtotal: number;
  saleTotalPrice: number;
  salePaymentMethod: string;
  saleDate: Date;
  employee: IEmployee;
  customer: ICustomer;
  saleDetails: Array<ISaleDetail>;
}

export type ICreateSale = Pick<ISale, 'salePaymentMethod'> & {
  employeeId: string;
  customerId: string;
  products: Array<Products>;
};

type Products = Pick<IProduct, 'productId'> & Pick<ISaleDetail, 'quantity'>;
export type IUpdateSale = Partial<ICreateSale>;
