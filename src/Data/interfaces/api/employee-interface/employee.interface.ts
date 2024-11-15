import { IHeadquarter } from '../headquarter-interface/headquarter.interface';
import { IUser } from '../user-interface/user.interface';
import { ISale } from '../sale-interface/sale.interface';
import { Iinventory } from '../inventory-interface/inventory.interface';

export interface IEmployee {
  employeeId: string;
  employeeIdentity: string;
  employeeName: string;
  employeeLastname: string;
  employeeAddress: string;
  employeePhone: string;
  employeeEmail: string;
  headquarter: IHeadquarter;
  inventory: Iinventory;
  sales: Array<ISale>;
  user: IUser;
}

export type ICreateEmployee = Pick<
  IEmployee,
  | 'employeeIdentity'
  | 'employeeName'
  | 'employeeLastname'
  | 'employeeEmail'
  | 'employeeAddress'
  | 'employeePhone'
> &
  Partial<Pick<IHeadquarter, 'headquarterId'>>;

export type IUpdateEmployee = Partial<ICreateEmployee>;
