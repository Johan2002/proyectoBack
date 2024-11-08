import { IEmployee } from '../employee-interface/employee.interface';
import { IRol } from '../rol-interfaces/rol.interface';

export interface IUser {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  employee: IEmployee;
  rol: IRol;
}

export type ICreateUser = Pick<
  IUser,
  'userName' | 'userEmail' | 'userPassword'
> &
  Partial<Pick<IEmployee, 'employeeId'>> &
  Partial<Pick<IRol, 'rolId'>>;

export type IUpdateUser = Partial<ICreateUser>;
