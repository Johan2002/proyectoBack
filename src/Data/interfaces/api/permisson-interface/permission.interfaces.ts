import { Rol } from "src/Data/entities/rol-entity/rol.entity";
import { IRol } from "../rol-interfaces/rol.interface";

export interface IPermission {

  permissionId: string;
  name: string;
  rol: Array<IRol>;

}

export type ICreatePermission = Pick<IPermission, 'name'|'rol'>