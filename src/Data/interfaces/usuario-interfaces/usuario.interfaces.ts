import { Empleado } from "src/Data/entities/empleado-entity/empleado.entity";
import { Rol } from "src/Data/entities/rol-entity/rol.entity";

export interface IUsuario {

  id: number;
  nombre: string;
  contraseña: string;
  empleado: Empleado;
  rol: Rol;
  
}