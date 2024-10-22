import { ICustomer } from '../costumer-interface/costumer.interface';
import { IEmployee } from '../employee-interface/employee.interface';
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

export type ICreateSale = Pick<
  ISale,
  'subtotal' | 'salePaymentMethod' | 'saleTotalPrice'
> &
  Partial<Pick<IEmployee, 'employeeId'>> &
  Partial<Pick<ICustomer, 'customerId'>> & {
    saleDetails?: Array<Partial<ISaleDetail>>;
  };
