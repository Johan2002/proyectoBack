import { Headquarter } from "src/Data/entities/headquarter-entity/headquarter.entity";
import { Sale } from "src/Data/entities/sale-entity/sale.entity";
import { User } from "src/Data/entities/user-entity/user.entity";
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
  headquarters: IHeadquarter;
  sales: Array<ISale>;
  user: IUser;
  
}

export type ICreateEmployee = Pick<IEmployee,'identity'|'name'|'lastname'|'email'|'address'|'phone'> & {
}