import { Permiso } from "src/Data/entities/permiso-entity/permiso.entity";
import { Usuario } from "src/Data/entities/usuario-entity/usuario.entity";

export interface IRol{

  id: number;
  nombre: string;
  usuario: Array<Usuario>;
  permiso: Array<Permiso>;
  
}