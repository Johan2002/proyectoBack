import { Employee } from "src/Data/entities/employee-entity/employee.entity";
import { Rol } from "src/Data/entities/rol-entity/rol.entity";

export interface IUser {

  id: number;
  name: string;
  email: string;
  password: string;
  employee: Employee;
  rol: Rol;
  
}

export type ICreateUser = Pick<IUser,'name'|'email'|'password'> & {
  // empleado: Pick<IEmpleado, 'id'>
}
