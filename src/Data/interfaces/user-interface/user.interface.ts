import { Employee } from "src/Data/entities/employee-entity/employee.entity";
import { Rol } from "src/Data/entities/rol-entity/rol.entity";

export interface IUser {

  userId: string;
  userName: string;
  email: string;
  password: string;
  employee?: Employee;
  rol: Rol;
  
}

export type ICreateUser = Pick<IUser,'userName'|'email'|'password'> & {
  // empleado: Pick<IEmpleado, 'id'>
}
