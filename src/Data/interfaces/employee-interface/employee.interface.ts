import { IHeadquarter } from "../headquarter-interface/headquarter.interface";
import { IUser } from "../user-interface/user.interface";
import { ISale } from "../sale-interface/sale.interface";

export interface IEmployee {

  employeeId: string;
  identity: string;
  name: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  headquarter: IHeadquarter;
  sales: Array<ISale>;
  user: IUser;
  
}

export type ICreateEmployee = Pick<IEmployee,'identity'|'name'|'lastname'|'email'|'address'|'phone'> & {
  headquarter: Pick<IHeadquarter, 'headquarterId'>;
  sales: Array<Pick<ISale, 'saleId'>>;
  user: Pick<IUser, 'userId'>;
}