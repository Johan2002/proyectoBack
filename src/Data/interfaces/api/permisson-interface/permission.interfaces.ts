import { IRol } from './../rol-interfaces/rol.interface';

export interface IPermission {
  permissionId: string;
  permissionName: string;
  rol: Array<IRol>;
}

export type ICreatePermission = Pick<IPermission, 'permissionName'> &
  Pick<IRol, 'rolId'>;
