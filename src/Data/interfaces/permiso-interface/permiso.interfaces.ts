import { Rol } from "src/Data/entities/rol-entity/rol.entity";

export interface IPermiso {

  id: number;
  name: string;
  rol: Array<Rol>;

}