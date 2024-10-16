import { IEmployee } from "../employee-interface/employee.interface";
import { IRol } from "../rol-interfaces/rol.interface";

export interface IUser {

  userId: string;
  userName: string;
  email: string;
  password: string;
  employee?: IEmployee;
  rol: IRol;
  
}

export type ICreateUser = Pick<IUser,'userName'|'email'|'password'> & {
  employee: Pick<IEmployee, 'employeeId'>
  rol: Pick<IRol, 'rolId'>;
}
