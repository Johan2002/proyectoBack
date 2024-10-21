import { ICustomer } from '../costumer-interface/costumer.interface';
import { IEmployee } from '../employee-interface/employee.interface';

export interface ISale {
  saleId: string;
  saleTotalPrice: number;
  salePaymentMethod: string;
  saleDate: Date;
  employee: IEmployee;
  customer: ICustomer;
}

export type ICreateSale = Pick<ISale, 'saleTotalPrice' | 'salePaymentMethod'> &
  Partial<Pick<IEmployee, 'employeeId'>> &
  Partial<Pick<ICustomer, 'customerId'>>;
