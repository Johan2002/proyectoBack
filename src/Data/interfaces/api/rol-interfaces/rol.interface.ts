import { IUser } from '../user-interface/user.interface';
import { IPermission } from '../permisson-interface/permission.interfaces';

export interface IRol {
  rolId: string;
  rolName: string;
  rolDescription: string;
  rolStatus: boolean;
  user: Array<IUser>;
  permission: Array<IPermission>;
}

export type ICreateRol = Pick<
  IRol,
  'rolName' | 'rolStatus' | 'permission' | 'user'
>;
