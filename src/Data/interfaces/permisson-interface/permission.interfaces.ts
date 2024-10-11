import { Rol } from "src/Data/entities/rol-entity/rol.entity";

export interface IPermiso {

  permissionId: string;
  name: string;
  rol: Array<Rol>;

}