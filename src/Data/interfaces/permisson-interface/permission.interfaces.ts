import { Rol } from "src/Data/entities/rol-entity/rol.entity";

export interface IPermiso {

  permissionId: number;
  name: string;
  rol: Array<Rol>;

}